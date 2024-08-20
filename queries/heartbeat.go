package queries

import (
	"log"
	"time"

	"github.com/chamanbravo/upstat/database"
	"github.com/chamanbravo/upstat/models"
)

func RetrieveHeartbeats(id, limit int) ([]*models.Heartbeat, error) {
	stmt, err := database.DB.Prepare("SELECT * FROM heartbeats WHERE monitor_id = $1 ORDER BY timestamp DESC limit $2")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(id, limit)
	if err != nil {
		log.Println("Error when trying to execute query")
		log.Println(err)
		return nil, err
	}
	defer rows.Close()

	var heartbeats []*models.Heartbeat

	for rows.Next() {
		heartbeat := new(models.Heartbeat)
		err := rows.Scan(&heartbeat.ID, &heartbeat.MonitorId, &heartbeat.Timestamp, &heartbeat.StatusCode, &heartbeat.Status, &heartbeat.Latency, &heartbeat.Message)
		if err != nil {
			log.Println("Error when trying to scan row")
			log.Println(err)
			return nil, err
		}
		heartbeats = append(heartbeats, heartbeat)
	}

	if err := rows.Err(); err != nil {
		log.Println("Error during iteration over rows")
		log.Println(err)
		return nil, err
	}

	return heartbeats, nil
}

func SaveHeartbeat(heartbeat *models.Heartbeat) error {
	stmt, err := database.DB.Prepare("INSERT INTO heartbeats(monitor_id, timestamp, status_code, status, latency, message) VALUES($1, $2, $3, $4, $5, $6)")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(heartbeat.MonitorId, heartbeat.Timestamp, heartbeat.StatusCode, heartbeat.Status, heartbeat.Latency, heartbeat.Message)
	if err != nil {
		log.Println("Error when trying to execute query")
		log.Println(err)
		return err
	}

	return nil
}

func RetrieveHeartbeatsByTime(id int, startTime time.Time) ([]*models.Heartbeat, error) {
	stmt, err := database.DB.Prepare("SELECT * FROM heartbeats WHERE monitor_id = $1 AND timestamp >= $2 ORDER BY timestamp ASC")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(id, startTime)
	if err != nil {
		log.Println("Error when trying to execute query")
		log.Println(err)
		return nil, err
	}
	defer rows.Close()

	var heartbeats []*models.Heartbeat

	for rows.Next() {
		heartbeat := new(models.Heartbeat)
		err := rows.Scan(&heartbeat.ID, &heartbeat.MonitorId, &heartbeat.Timestamp, &heartbeat.StatusCode, &heartbeat.Status, &heartbeat.Latency, &heartbeat.Message)
		if err != nil {
			log.Println("Error when trying to scan row")
			log.Println(err)
			return nil, err
		}
		heartbeats = append(heartbeats, heartbeat)
	}

	if err := rows.Err(); err != nil {
		log.Println("Error during iteration over rows")
		log.Println(err)
		return nil, err
	}

	return heartbeats, nil
}
