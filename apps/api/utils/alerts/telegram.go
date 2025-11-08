package alerts

import (
	"fmt"
	"net/url"

	"github.com/chamanbravo/upstat/models"
)

type TelegramAlertMessage struct {
	Text      string
	ParseMode string
}

func NewTelegramAlert(heartbeat *models.Heartbeat, monitor *models.Monitor) *TelegramAlertMessage {
	alertText := fmt.Sprintf("✅ Your monitor %v is UP ✅\nMonitor: *%v* | URL: %v\nStatus Code: *%v* | Latency: *%vms*",
		monitor.Name,
		monitor.Name,
		monitor.Url,
		heartbeat.StatusCode,
		heartbeat.Latency)

	if heartbeat.Status == "red" {
		alertText = fmt.Sprintf("❌ Your monitor %v is DOWN ❌\nMonitor: *%v* | URL: %v", monitor.Name, monitor.Name, monitor.Url)
	}

	return &TelegramAlertMessage{
		Text:      url.QueryEscape(alertText),
		ParseMode: "Markdown", // Markdown | HTML, haven't tested with V2 yet
	}
}
