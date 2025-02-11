package queries

import (
	"database/sql"
	"log"

	"github.com/chamanbravo/upstat/database"
	"github.com/chamanbravo/upstat/dto"
	"github.com/chamanbravo/upstat/models"
)

func SaveIncident(incident *dto.SaveIncident) error {
	stmt, err := database.DB.Prepare("INSERT INTO incidents(type, description, is_positive, monitor_id) VALUES($1, $2, $3, $4)")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(incident.Type, incident.Description, incident.IsPositive, incident.MonitorId)
	if err != nil {
		log.Println("Error when trying to save incident.")
		log.Println(err)
		return err
	}

	return nil
}

func LatestIncidentByMonitorId(id int) (*models.Incident, error) {
	stmt, err := database.DB.Prepare(`
    SELECT id, type, description, is_positive, monitor_id
    FROM incidents
    WHERE monitor_id = $1
    ORDER BY id DESC
    LIMIT 1;
    `)
	if err != nil {
		log.Printf("Error preparing statement: %v", err)
		return nil, err
	}
	defer stmt.Close()

	row := stmt.QueryRow(id)

	var incident models.Incident
	err = row.Scan(&incident.ID, &incident.Type, &incident.Description, &incident.IsPositive, &incident.MonitorId)
	if err != nil {
		if err == sql.ErrNoRows {
			log.Printf("No incident rows found. %v", err)
			return nil, nil
		}
		log.Printf("Error scanning row: %v", err)
		return nil, err
	}

	return &incident, nil
}
