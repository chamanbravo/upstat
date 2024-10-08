package utils

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/chamanbravo/upstat/models"
	"github.com/chamanbravo/upstat/queries"
)

func Ping(monitor *models.Monitor) *models.Heartbeat {
	heartbeat := new(models.Heartbeat)
	heartbeat.MonitorId = monitor.ID
	fmt.Printf("Pinging %v at %v \n", monitor.Name, monitor.Url)
	startTime := time.Now()
	response, err := http.Get(monitor.Url)
	latency := time.Since(startTime)

	if err != nil {
		heartbeat = handlePingError(heartbeat, monitor, "error", "unable to ping")
	} else {
		responseStatusCode := strings.Split(response.Status, " ")[0]
		defer response.Body.Close()
		if strings.HasPrefix(responseStatusCode, "2") { // check if status starts with 2 for 2xx.
			heartbeat = handlePingSuccess(heartbeat, monitor, responseStatusCode, latency)
		} else {
			heartbeat = handlePingError(heartbeat, monitor, responseStatusCode, response.Status)
		}
	}

	heartbeat.Timestamp = time.Now().UTC()
	err = queries.SaveHeartbeat(heartbeat)
	if err != nil {
		log.Printf("Error when trying to save heartbeat: %v", err.Error())
	}

	return heartbeat
}

func handlePingError(heartbeat *models.Heartbeat, monitor *models.Monitor, statusCode string, responseMessage string) *models.Heartbeat {
	heartbeat.Status = "red"
	heartbeat.StatusCode = statusCode
	heartbeat.Message = responseMessage
	heartbeat.Latency = 0
	if monitor.Status != "red" {
		err := queries.UpdateMonitorStatus(monitor.ID, "red")
		if err != nil {
			log.Printf("Error when trying to update monitor status: %v", err.Error())
		}
	}
	return heartbeat
}

func handlePingSuccess(heartbeat *models.Heartbeat, monitor *models.Monitor, statusCode string, latency time.Duration) *models.Heartbeat {
	heartbeat.Status = "green"
	heartbeat.StatusCode = statusCode
	heartbeat.Message = statusCode + " OK"
	heartbeat.Latency = int(latency.Milliseconds())

	if monitor.Status != "green" {
		err := queries.UpdateMonitorStatus(monitor.ID, "green")
		if err != nil {
			log.Printf("Error when trying to update monitor status: %v", err.Error())
		}
	}

	return heartbeat
}
