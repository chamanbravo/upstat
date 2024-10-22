package queries

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"

	"github.com/chamanbravo/upstat/database"
	"github.com/chamanbravo/upstat/dto"
	"github.com/chamanbravo/upstat/models"
)

func CreateNotificationChannel(nc *dto.NotificationCreateIn) error {
	stmt, err := database.DB.Prepare("INSERT INTO notifications(name, provider, data) VALUES($1, $2, $3)")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return err
	}
	defer stmt.Close()

	dataJson, err := json.Marshal(nc.Data)
	if err != nil {
		log.Println("Error marshalling the data to json")
		log.Println(err)
		return err
	}

	_, err = stmt.Exec(nc.Name, nc.Provider, dataJson)
	if err != nil {
		log.Println("Error when trying to create new notification channel")
		log.Println(err)
		return err
	}

	return nil
}

func ListNotificationChannel() ([]dto.NotificationItem, error) {
	stmt, err := database.DB.Prepare("SELECT id, name, provider FROM notifications")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	rows, err := stmt.Query()
	if err != nil {
		log.Println("Error when trying to query the database")
		log.Println(err)
		return nil, err
	}

	var notifications []dto.NotificationItem
	for rows.Next() {
		var notification dto.NotificationItem
		err = rows.Scan(&notification.ID, &notification.Name, &notification.Provider)
		if err != nil {
			log.Println("Error when trying to scan the row")
			log.Println(err)
			return nil, err
		}
		notifications = append(notifications, notification)
	}

	return notifications, nil
}

func DeleteNotificationChannel(id int) error {
	stmt, err := database.DB.Prepare("DELETE FROM notifications WHERE id = $1")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(id)
	if err != nil {
		log.Println("Error when trying to delete a notification channel")
		log.Println(err)
		return err
	}

	return nil
}

func UpdateNotificationById(id int, nc *dto.NotificationCreateIn) error {
	stmt, err := database.DB.Prepare("UPDATE notifications SET name = $1, provider = $2, data = $3 WHERE id = $4")
	if err != nil {
		return err
	}
	defer stmt.Close()

	dataJson, err := json.Marshal(nc.Data)
	if err != nil {
		log.Println("Error marshalling the data to json")
		log.Println(err)
		return err
	}

	result, err := stmt.Exec(nc.Name, nc.Provider, dataJson, id)
	if result != nil {
		if err == sql.ErrNoRows {
			return nil
		}
		return err
	}

	return nil
}

func FindNotificationById(id int) (*models.Notification, error) {
	stmt, err := database.DB.Prepare("SELECT id, name, provider, data FROM notifications WHERE id = $1")
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	notification := new(models.Notification)
	var dataStr string

	err = stmt.QueryRow(id).Scan(&notification.ID, &notification.Name, &notification.Provider, &dataStr)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("notification doesn't exist")
		}
		log.Println("Error when trying to find notification channel:\n", err)
		return nil, err
	}

	// Unmarshal JSON data into struct
	if err := json.Unmarshal([]byte(dataStr), &notification.Data); err != nil {
		log.Println("Error when unmarshalling JSON data:\n", err)
		return nil, err
	}

	return notification, nil
}

func NotificationMonitor(monitorId int, notificationChannels []string) error {
	stmt, err := database.DB.Prepare("INSERT INTO notifications_monitors(monitor_id, notification_id) VALUES($1, $2)")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return err
	}
	defer stmt.Close()

	for _, notificationChannel := range notificationChannels {
		_, err = stmt.Exec(monitorId, notificationChannel)
		if err != nil {
			log.Println("Error when trying to create new notification channel")
			log.Println(err)
			return err
		}
	}

	return nil
}

func FindNotificationChannelsByMonitorId(id int) ([]models.Notification, error) {
	stmt, err := database.DB.Prepare(`
	SELECT
        n.id,
		n.name AS notification_name,
		n.provider,
		n.data
	FROM
		notifications_monitors nm
	JOIN
		monitors m ON nm.monitor_id = m.id
	JOIN
		notifications n ON nm.notification_id = n.id
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

	var notifications []models.Notification
	for rows.Next() {
		var notification models.Notification
		var dataStr string
		err = rows.Scan(&notification.ID, &notification.Name, &notification.Provider, &dataStr)
		if err != nil {
			log.Println("Error when trying to scan the row")
			log.Println(err)
			return nil, err
		}

		if err := json.Unmarshal([]byte(dataStr), &notification.Data); err != nil {
			log.Println("Error when unmarshalling JSON data:\n", err)
			return nil, err
		}

		notifications = append(notifications, notification)
	}

	return notifications, nil
}

func UpdateNotificationMonitorById(monitorId int, notificationChannels []string) error {
	stmt, err := database.DB.Prepare("DELETE FROM notifications_monitors WHERE monitor_id = $1")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(monitorId)
	if err != nil {
		log.Println("Error when trying to delete notification channels")
		log.Println(err)
		return err
	}

	err = NotificationMonitor(monitorId, notificationChannels)
	if err != nil {
		log.Println("Error when trying to create new notification channels")
		log.Println(err)
		return err
	}

	return nil
}
