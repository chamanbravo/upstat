package alerts

import (
	"fmt"

	"github.com/chamanbravo/upstat/models"
)

type GotifyAlertMessage struct {
	Title    string `json:"title"`
	Message  string `json:"message"`
	Priority int    `json:"priority"`
}

func NewGotifyAlert(heartbeat *models.Heartbeat, monitor *models.Monitor) *GotifyAlertMessage {
	if heartbeat.Status == "green" {
		return &GotifyAlertMessage{
			Title:    fmt.Sprintf("✅ %v is UP", monitor.Name),
			Message:  fmt.Sprintf("Monitor: %v | URL: %v\nStatus Code: %v | Latency: %vms", monitor.Name, monitor.Url, heartbeat.StatusCode, heartbeat.Latency),
			Priority: 5,
		}
	} else if heartbeat.Status == "red" {
		return &GotifyAlertMessage{
			Title:    fmt.Sprintf("❌ %v is DOWN", monitor.Name),
			Message:  fmt.Sprintf("Monitor: %v | URL: %v", monitor.Name, monitor.Url),
			Priority: 8,
		}
	}

	return &GotifyAlertMessage{
		Title:    fmt.Sprintf("⚠️ %v status changed", monitor.Name),
		Message:  fmt.Sprintf("Monitor: %v | URL: %v", monitor.Name, monitor.Url),
		Priority: 6,
	}
}
