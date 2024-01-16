package queries

import (
	"database/sql"
	"log"

	"github.com/chamanbravo/upstat/database"
	"github.com/chamanbravo/upstat/models"
	"github.com/chamanbravo/upstat/serializers"
)

func CreateMonitor(u *serializers.AddMonitorIn) (*models.Monitor, error) {
	stmt, err := database.DB.Prepare("INSERT INTO monitors(name, url, type, timeout, frequency, method) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, frequency, url")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	monitor := new(models.Monitor)
	result := stmt.QueryRow(u.Name, u.URL, u.Type, u.Timeout, u.Frequency, u.Method).Scan(&monitor.ID, &monitor.Frequency, &monitor.Url)
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
	result := stmt.QueryRow(id).Scan(&monitor.ID, &monitor.Frequency, &monitor.Url)
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
		err := rows.Scan(&monitor.ID, &monitor.Name, &monitor.Url, &monitor.Type, &monitor.Timeout, &monitor.Frequency, &monitor.Method)
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
