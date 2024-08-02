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
			return nil, fmt.Errorf("Monitor doesn't exist")
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

	result := stmt.QueryRow(monitor.Name, monitor.URL, monitor.Type, monitor.Method, monitor.Frequency, id)
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
		return fmt.Errorf("No monitor found with ID %v", id)
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
		return fmt.Errorf("Monitor with ID %d not found", id)
	}

	return nil
}
