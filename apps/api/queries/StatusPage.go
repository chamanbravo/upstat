package queries

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/chamanbravo/upstat/database"
	"github.com/chamanbravo/upstat/dto"
	"github.com/chamanbravo/upstat/models"
)

func CreateStatusPage(u *dto.CreateStatusPageIn) error {
	stmt, err := database.DB.Prepare("INSERT INTO status_pages (name, slug) VALUES($1, $2)")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(u.Name, u.Slug)
	if err != nil {
		log.Println("Error when trying to save user")
		log.Println(err)
		return err
	}

	return nil
}

func ListStatusPages() ([]*models.StatusPage, error) {
	stmt, err := database.DB.Prepare("SELECT id, name, slug FROM status_pages")
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

	var statuspages []*models.StatusPage

	for rows.Next() {
		statuspage := new(models.StatusPage)
		err := rows.Scan(&statuspage.ID, &statuspage.Name, &statuspage.Slug)
		if err != nil {
			log.Println("Error when trying to scan row")
			log.Println(err)
			return nil, err
		}
		statuspages = append(statuspages, statuspage)
	}

	if err := rows.Err(); err != nil {
		log.Println("Error during iteration over rows")
		log.Println(err)
		return nil, err
	}

	return statuspages, nil
}

func UpdateStatusPage(id int, statusPage *dto.CreateStatusPageIn) error {
	stmt, err := database.DB.Prepare("UPDATE status_pages SET name = $1, slug = $2 WHERE id = $3")
	if err != nil {
		return err
	}
	defer stmt.Close()

	result, err := stmt.Exec(statusPage.Name, statusPage.Slug, id)
	if result != nil {
		if err == sql.ErrNoRows {
			return nil
		}
		return err
	}

	return nil
}

func DeleteStatusPageById(id int) error {
	stmt, err := database.DB.Prepare("DELETE FROM status_pages WHERE id = $1")
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
		return fmt.Errorf("status page with ID %d not found", id)
	}

	return nil
}

func FindStatusPageById(id int) (*models.StatusPage, error) {
	stmt, err := database.DB.Prepare("SELECT * FROM status_pages WHERE id = $1")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	statusPage := new(models.StatusPage)
	err = stmt.QueryRow(id).Scan(&statusPage.ID, &statusPage.Name, &statusPage.Slug)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("monitor doesn't exist")
		}
		log.Println("Error when trying to find monitor")
		log.Println(err)
		return nil, err
	}

	return statusPage, nil
}

func StatusPageMonitor(monitorId int, statusPages []string) error {
	stmt, err := database.DB.Prepare("INSERT INTO status_pages_monitors(monitor_id, status_pages_id) VALUES($1, $2)")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return err
	}
	defer stmt.Close()

	for _, statusPage := range statusPages {
		_, err = stmt.Exec(monitorId, statusPage)
		if err != nil {
			log.Println("Error when trying to create new status page")
			log.Println(err)
			return err
		}
	}

	return nil
}

func UpdateStatusPageMonitorById(monitorId int, statusPages []string) error {
	stmt, err := database.DB.Prepare("DELETE FROM status_pages_monitors WHERE monitor_id = $1")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(monitorId)
	if err != nil {
		log.Println("Error when trying to delete status page")
		log.Println(err)
		return err
	}

	err = StatusPageMonitor(monitorId, statusPages)
	if err != nil {
		log.Println(err)
		return err
	}

	return nil
}

func FindStatusPageByMonitorId(id int) ([]models.StatusPage, error) {
	stmt, err := database.DB.Prepare(`
	SELECT
        n.id,
		n.name,
        n.slug
	FROM
		status_pages_monitors nm
	JOIN
		monitors m ON nm.monitor_id = m.id
	JOIN
		status_pages n ON nm.status_pages_id= n.id
	WHERE
		nm.monitor_id = $1;
	`)
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(id)
	if err != nil {
		log.Println("Error when trying to query the database")
		log.Println(err)
		return nil, err
	}
	defer rows.Close()

	var statusPages []models.StatusPage
	for rows.Next() {
		var statusPage models.StatusPage
		err = rows.Scan(&statusPage.ID, &statusPage.Name, &statusPage.Slug)
		if err != nil {
			log.Println("Error when trying to scan the row")
			log.Println(err)
			return nil, err
		}
		statusPages = append(statusPages, statusPage)
	}

	return statusPages, nil
}

func FindStatusPageBySlug(slug string) (*models.StatusPage, error) {
	stmt, err := database.DB.Prepare("SELECT * FROM status_pages WHERE slug = $1")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	statusPage := new(models.StatusPage)
	err = stmt.QueryRow(slug).Scan(&statusPage.ID, &statusPage.Name, &statusPage.Slug)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		log.Println("Error when trying to find monitor")
		log.Println(err)
		return nil, err
	}

	return statusPage, nil
}

func RetrieveStatusPageMonitors(slug string) ([]*models.Monitor, error) {
	stmt, err := database.DB.Prepare(`
	SELECT DISTINCT
		spm.monitor_id,
		m.name	
	FROM
		status_pages_monitors spm
	JOIN
		monitors m ON spm.monitor_id = m.id
	LEFT JOIN
		heartbeats hb ON spm.monitor_id = hb.monitor_id
	WHERE
		spm.status_pages_id = (SELECT id FROM status_pages WHERE slug = $1);
	`)
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query(slug)
	if err != nil {
		log.Println("Error when trying to query the database")
		log.Println(err)
		return nil, err
	}

	var monitors []*models.Monitor
	for rows.Next() {
		monitor := new(models.Monitor)
		err = rows.Scan(&monitor.ID, &monitor.Name)
		if err != nil {
			log.Println("Error when trying to scan the row")
			log.Println(err)
			return nil, err
		}
		monitors = append(monitors, monitor)
	}

	return monitors, nil
}
