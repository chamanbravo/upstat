package alerts

import (
	"fmt"

	"github.com/chamanbravo/upstat/models"
)

type NtfyAlertMessage struct {
	Topic   string `json:"topic"`
	Title   string `json:"title"`
	Message string `json:"message"`
	Tags    string `json:"tags"`
	Priority int   `json:"priority,omitempty"`
}

func NewNtfyAlert(heartbeat *models.Heartbeat, monitor *models.Monitor) *NtfyAlertMessage {
	if heartbeat.Status == "green" {
		return &NtfyAlertMessage{
			Topic:   monitor.Name,
			Title:   fmt.Sprintf("✅ %v is UP", monitor.Name),
			Message: fmt.Sprintf("Monitor: %v | URL: %v\nStatus Code: %v | Latency: %vms", monitor.Name, monitor.Url, heartbeat.StatusCode, heartbeat.Latency),
			Tags:    "white_check_mark",
			Priority: 3,
		}
	} else if heartbeat.Status == "red" {
		return &NtfyAlertMessage{
			Topic:   monitor.Name,
			Title:   fmt.Sprintf("❌ %v is DOWN", monitor.Name),
			Message: fmt.Sprintf("Monitor: %v | URL: %v", monitor.Name, monitor.Url),
			Tags:    "x",
			Priority: 5,
		}
	}

	return &NtfyAlertMessage{
		Topic:   monitor.Name,
		Title:   fmt.Sprintf("⚠️ %v status changed", monitor.Name),
		Message: fmt.Sprintf("Monitor: %v | URL: %v", monitor.Name, monitor.Url),
		Tags:    "warning",
		Priority: 4,
	}
}
