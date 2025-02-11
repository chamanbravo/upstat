package alerts

import (
	"fmt"
	"time"

	"github.com/chamanbravo/upstat/models"
)

type SlackAttachment struct {
	Title     string `json:"title"`
	Text      string `json:"text"`
	Timestamp int64  `json:"ts"`
	Color     string `json:"color"`
}

type SlackWebhookMessage struct {
	Username    string            `json:"username"`
	IconURL     string            `json:"icon_url"`
	Attachments []SlackAttachment `json:"attachments"`
}

func SlackAlertMessage(heartbeat *models.Heartbeat, monitor *models.Monitor) SlackWebhookMessage {
	var slackMessage SlackWebhookMessage
	currentTimestamp := time.Now().Unix()

	if heartbeat.Status == "green" {
		slackMessage = SlackWebhookMessage{
			Username: "Upstat",
			IconURL:  "https://raw.githubusercontent.com/chamanbravo/upstat/main/docs/assets/upstat.png", // Upstat icon
			Attachments: []SlackAttachment{
				{
					Title:     fmt.Sprintf("✅ Your monitor %v is UP ✅", monitor.Name),
					Text:      fmt.Sprintf("Monitor: *%v* | URL: %v\nStatus Code: *%v* | Latency: *%vms*", monitor.Name, monitor.Url, heartbeat.StatusCode, heartbeat.Latency),
					Timestamp: currentTimestamp,
					Color:     "good", // green color
				},
			},
		}
	} else if heartbeat.Status == "red" {
		slackMessage = SlackWebhookMessage{
			Username: "Upstat",
			IconURL:  "https://raw.githubusercontent.com/chamanbravo/upstat/main/docs/assets/upstat.png", // Upstat icon
			Attachments: []SlackAttachment{
				{
					Title:     fmt.Sprintf("❌ Your monitor %v is DOWN ❌", monitor.Name),
					Text:      fmt.Sprintf("Monitor: *%v* | URL: %v", monitor.Name, monitor.Url),
					Timestamp: currentTimestamp,
					Color:     "danger", // red color
				},
			},
		}
	}

	return slackMessage
}
