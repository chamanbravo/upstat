package queries

import (
	"database/sql"
	"fmt"
	"log"
	"time"

	"github.com/chamanbravo/upstat/database"
	"github.com/chamanbravo/upstat/dto"
	"github.com/chamanbravo/upstat/models"
)

func CreateMonitor(u *dto.AddMonitorIn) (*models.Monitor, error) {
	stmt, err := database.DB.Prepare("INSERT INTO monitors(name, url, type, frequency, method, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, frequency, url")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	monitor := new(models.Monitor)
	result := stmt.QueryRow(u.Name, u.URL, u.Type, u.Frequency, u.Method, "green").Scan(&monitor.ID, &monitor.Frequency, &monitor.Url)
	if result != nil {
		if result == sql.ErrNoRows {
			return nil, nil
		}
		log.Println("Error when trying to find user")
		log.Println(err)
		return nil, err
	}

	return monitor, nil
}

func FindMonitorById(id int) (*models.Monitor, error) {
	stmt, err := database.DB.Prepare("SELECT * FROM monitors WHERE id = $1")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	monitor := new(models.Monitor)
	err = stmt.QueryRow(id).Scan(&monitor.ID, &monitor.Name, &monitor.Url, &monitor.Type, &monitor.Method, &monitor.Frequency, &monitor.Status)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("monitor doesn't exist")
		}
		log.Println("Error when trying to find monitor")
		log.Println(err)
		return nil, err
	}

	return monitor, nil
}

func UpdateMonitorById(id int, monitor *dto.AddMonitorIn) error {
	stmt, err := database.DB.Prepare("UPDATE monitors SET name = $1, url = $2, type = $3, method = $4, frequency = $5  WHERE id = $6")
	if err != nil {
		return err
	}
	defer stmt.Close()

	result, err := stmt.Exec(monitor.Name, monitor.URL, monitor.Type, monitor.Method, monitor.Frequency, id)
	if result != nil {
		if err == sql.ErrNoRows {
			return nil
		}
		return err
	}

	return nil
}

func RetrieveMonitors() ([]*models.Monitor, error) {
	stmt, err := database.DB.Prepare("SELECT * FROM monitors")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query()
	if err != nil {
		log.Println("Error when trying to execute query")
		log.Println(err)
		return nil, err
	}
	defer rows.Close()

	var monitors []*models.Monitor

	for rows.Next() {
		monitor := new(models.Monitor)
		err := rows.Scan(&monitor.ID, &monitor.Name, &monitor.Url, &monitor.Type, &monitor.Method, &monitor.Frequency, &monitor.Status)
		if err != nil {
			log.Println("Error when trying to scan row")
			log.Println(err)
			return nil, err
		}
		monitors = append(monitors, monitor)
	}

	if err := rows.Err(); err != nil {
		log.Println("Error during iteration over rows")
		log.Println(err)
		return nil, err
	}

	return monitors, nil
}

func UpdateMonitorStatus(id int, status string) error {
	stmt, err := database.DB.Prepare("UPDATE monitors SET status = $1 WHERE id = $2")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return err
	}
	defer stmt.Close()

	result, err := stmt.Exec(status, id)
	if err != nil {
		log.Println("Error when trying to update monitor status")
		log.Println(err)
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		log.Println("Error getting RowsAffected")
		log.Println(err)
		return err
	}

	if rowsAffected == 0 {
		return fmt.Errorf("no monitor found with ID %v", id)
	}

	return nil
}

func RetrieveAverageLatency(id int, timestamp time.Time) (float64, error) {
	stmt, err := database.DB.Prepare("SELECT AVG(latency) as average_latency FROM heartbeats WHERE monitor_id = $1 AND timestamp >= $2")
	if err != nil {
		return 0, err
	}
	defer stmt.Close()

	var averageLatency float64
	err = stmt.QueryRow(id, timestamp).Scan(&averageLatency)
	if err != nil {
		return 0, err
	}

	return averageLatency, nil
}

func RetrieveUptime(id int, timestamp time.Time) (float64, error) {
	stmt, err := database.DB.Prepare("SELECT (COUNT(CASE WHEN status = 'green' THEN 1 END) * 100.0) / COUNT(*) as green_percentage FROM heartbeats WHERE monitor_id = $1 AND timestamp >= $2")
	if err != nil {
		return 0, err
	}
	defer stmt.Close()

	var averageLatency float64
	err = stmt.QueryRow(id, timestamp).Scan(&averageLatency)
	if err != nil {
		return 0, err
	}

	return averageLatency, nil
}

type AvailabilityWindowCounts struct {
	Total int
	Green int
}

type MonitorAvailabilityStats struct {
	Frequency int
	Today     AvailabilityWindowCounts
	Last7     AvailabilityWindowCounts
	Last30    AvailabilityWindowCounts
	Last365   AvailabilityWindowCounts
}

// RetrieveAvailabilityStats returns the heartbeat counts for the four windows
// (today / 7d / 30d / 365d) plus the monitor's frequency in a single round-trip.
// The 365-day filter on the outer WHERE is the largest window — every shorter
// bucket is computed via conditional aggregation over the same scan.
func RetrieveAvailabilityStats(id int, today, w7, d30, d365 time.Time) (*MonitorAvailabilityStats, error) {
	stmt, err := database.DB.Prepare(`
		SELECT
			(SELECT frequency FROM monitors WHERE id = $1) AS frequency,
			COUNT(CASE WHEN timestamp >= $2 THEN 1 END) AS today_total,
			COUNT(CASE WHEN timestamp >= $2 AND status = 'green' THEN 1 END) AS today_green,
			COUNT(CASE WHEN timestamp >= $3 THEN 1 END) AS w7_total,
			COUNT(CASE WHEN timestamp >= $3 AND status = 'green' THEN 1 END) AS w7_green,
			COUNT(CASE WHEN timestamp >= $4 THEN 1 END) AS d30_total,
			COUNT(CASE WHEN timestamp >= $4 AND status = 'green' THEN 1 END) AS d30_green,
			COUNT(*) AS d365_total,
			COUNT(CASE WHEN status = 'green' THEN 1 END) AS d365_green
		FROM heartbeats
		WHERE monitor_id = $1 AND timestamp >= $5
	`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var stats MonitorAvailabilityStats
	var frequency sql.NullInt64
	err = stmt.QueryRow(id, today, w7, d30, d365).Scan(
		&frequency,
		&stats.Today.Total, &stats.Today.Green,
		&stats.Last7.Total, &stats.Last7.Green,
		&stats.Last30.Total, &stats.Last30.Green,
		&stats.Last365.Total, &stats.Last365.Green,
	)
	if err != nil {
		return nil, err
	}
	stats.Frequency = int(frequency.Int64)

	return &stats, nil
}

func DeleteMonitorById(id int) error {
	stmt, err := database.DB.Prepare("DELETE FROM monitors WHERE id = $1")
	if err != nil {
		return err
	}
	defer stmt.Close()

	result, err := stmt.Exec(id)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	if rowsAffected == 0 {
		return fmt.Errorf("monitor with ID %d not found", id)
	}

	return nil
}
