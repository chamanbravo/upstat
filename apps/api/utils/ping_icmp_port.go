package utils

import (
	"fmt"
	"log"
	"net"
	"time"

	"github.com/chamanbravo/upstat/models"
	"github.com/chamanbravo/upstat/queries"
)

func PingICMP(monitor *models.Monitor) *models.Heartbeat {
	heartbeat := new(models.Heartbeat)
	heartbeat.MonitorId = monitor.ID
	fmt.Printf("ICMP pinging %v at %v \n", monitor.Name, monitor.Url)

	startTime := time.Now()
	conn, err := net.DialTimeout("ip4:icmp", monitor.Url, 10*time.Second)
	latency := time.Since(startTime)

	if err != nil {
		heartbeat = handlePingError(heartbeat, monitor, "error", "ICMP ping failed: "+err.Error())
	} else {
		defer conn.Close()
		heartbeat.Status = "green"
		heartbeat.StatusCode = "0"
		heartbeat.Message = "ICMP OK"
		heartbeat.Latency = int(latency.Milliseconds())

		if monitor.Status != "green" {
			err := queries.UpdateMonitorStatus(monitor.ID, "green")
			if err != nil {
				log.Printf("Error when trying to update monitor status: %v", err.Error())
			}
		}
	}

	heartbeat.Timestamp = time.Now().UTC()
	err = queries.SaveHeartbeat(heartbeat)
	if err != nil {
		log.Printf("Error when trying to save heartbeat: %v", err.Error())
	}

	return heartbeat
}

func PingPort(monitor *models.Monitor) *models.Heartbeat {
	heartbeat := new(models.Heartbeat)
	heartbeat.MonitorId = monitor.ID
	fmt.Printf("Port checking %v at %v \n", monitor.Name, monitor.Url)

	startTime := time.Now()
	conn, err := net.DialTimeout("tcp", monitor.Url, 10*time.Second)
	latency := time.Since(startTime)

	if err != nil {
		heartbeat = handlePingError(heartbeat, monitor, "error", "Port check failed: "+err.Error())
	} else {
		defer conn.Close()
		heartbeat.Status = "green"
		heartbeat.StatusCode = "0"
		heartbeat.Message = "Port OK"
		heartbeat.Latency = int(latency.Milliseconds())

		if monitor.Status != "green" {
			err := queries.UpdateMonitorStatus(monitor.ID, "green")
			if err != nil {
				log.Printf("Error when trying to update monitor status: %v", err.Error())
			}
		}
	}

	heartbeat.Timestamp = time.Now().UTC()
	err = queries.SaveHeartbeat(heartbeat)
	if err != nil {
		log.Printf("Error when trying to save heartbeat: %v", err.Error())
	}

	return heartbeat
}
