package alerts

import (
	"fmt"
	"time"

	"github.com/chamanbravo/upstat/models"
)

type Embeds struct {
	Title       string `json:"title"`
	Time        string `json:"time"`
	Description string `json:"description"`
	Color       int    `json:"color"`
}

type DiscordWebhookMessage struct {
	Username  string   `json:"username"`
	AvatarURL string   `json:"avatar_url"`
	Embeds    []Embeds `json:"embeds"`
}

func DiscordAlertMessage(heartbeat *models.Heartbeat, monitor *models.Monitor) DiscordWebhookMessage {
	var discordMessage DiscordWebhookMessage
	if heartbeat.Status == "green" {
		discordMessage = DiscordWebhookMessage{
			Username:  "Upstat",
			AvatarURL: "https://raw.githubusercontent.com/chamanbravo/upstat/main/docs/assets/upstat.png", // Upstat avatar
			Embeds: []Embeds{
				{
					Title:       fmt.Sprintf("✅ Your monitor %v is UP ✅", monitor.Name),
					Time:        time.Now().Format("2006-01-02 15:04:05"),
					Description: fmt.Sprintf("Monitor: **%v** | URL: **%v**\nStatus Code: **%v** | Latency: **%vms**", monitor.Name, monitor.Url, heartbeat.StatusCode, heartbeat.Latency),
					Color:       65280, // green
				},
			},
		}
	} else if heartbeat.Status == "red" {
		discordMessage = DiscordWebhookMessage{
			Username:  "Upstat",
			AvatarURL: "https://raw.githubusercontent.com/chamanbravo/upstat/main/docs/assets/upstat.png", // Upstat avatar
			Embeds: []Embeds{
				{
					Title:       fmt.Sprintf("❌ Your monitor %v is down ❌", monitor.Name),
					Time:        time.Now().Format("2006-01-02 15:04:05"),
					Description: fmt.Sprintf("Monitor: %v | URL: %v ", monitor.Name, monitor.Url),
					Color:       16711680, // red
				},
			},
		}
	}

	return discordMessage
}
