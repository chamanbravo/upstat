package utils

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/chamanbravo/upstat/models"
	"github.com/chamanbravo/upstat/queries"
)

var (
	stopChannel   chan struct{}
	stopWaitGroup sync.WaitGroup
	goroutines    = make(map[int]chan struct{})
	mutex         sync.Mutex
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

func StartGoroutine(monitor *models.Monitor) {
	mutex.Lock()
	defer mutex.Unlock()

	id := monitor.ID

	goroutineStopChannel := make(chan struct{})
	goroutines[id] = goroutineStopChannel

	stopWaitGroup.Add(1)

	go func() {
		defer func() {
			stopWaitGroup.Done()
			mutex.Lock()
			delete(goroutines, id)
			mutex.Unlock()
		}()

		for {
			select {
			case <-stopChannel:
				fmt.Printf("Goroutine with ID %d stopped\n", id)
				return
			case <-goroutineStopChannel:
				fmt.Printf("Goroutine with ID %d stopped by request\n", id)
				return
			default:
				monitor, err := queries.FindMonitorById(id)
				if err != nil {
					log.Printf("Error retrieving updated monitor data: %v", err)
					continue
				}
				heartbeat := new(models.Heartbeat)
				heartbeat.MonitorId = id
				if monitor.Status != "yellow" {
					fmt.Printf("Pinging %v at %v \n", monitor.Name, monitor.Url)
					startTime := time.Now()
					response, err := http.Get(monitor.Url)
					if err != nil {
						heartbeat.Status = "red"
						heartbeat.StatusCode = "error"
						heartbeat.Message = "unable to ping"
						heartbeat.Latency = 0
						if monitor.Status != "red" {
							err := queries.UpdateMonitorStatus(monitor.ID, "red")
							if err != nil {
								log.Printf("Error when trying to update monitor status: %v", err.Error())
							}
						}
					} else {
						heartbeat.Status = "green"
						heartbeat.StatusCode = strings.Split(response.Status, " ")[0]
						heartbeat.Message = strings.Split(response.Status, " ")[1]
						latency := time.Since(startTime).Milliseconds()
						heartbeat.Latency = int(latency)
						defer response.Body.Close()

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

					notificationChannels, err := queries.FindNotificationChannelsByMonitorId(id)
					var discordMessage DiscordWebhookMessage
					if heartbeat.Status == "green" {
						discordMessage = DiscordWebhookMessage{
							Username:  "Upstat",
							AvatarURL: "https://w7.pngwing.com/pngs/370/871/png-transparent-san-carlos-upstart-peer-to-peer-lending-loan-lending-club-logos-angle-investment-teal.png", // Upstat avatar
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
							AvatarURL: "https://w7.pngwing.com/pngs/370/871/png-transparent-san-carlos-upstart-peer-to-peer-lending-loan-lending-club-logos-angle-investment-teal.png", // Upstat avatar
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
					if err == nil {
						for _, v := range notificationChannels {
							jsonData, err := json.Marshal(discordMessage)
							if err == nil {
								_, err := http.Post(v.Data.WebhookUrl, "application/json", strings.NewReader(string(jsonData)))
								if err != nil {
									log.Printf("Error when trying to send heartbeat to webhook: %v", err.Error())
								}
							} else {
								log.Printf("Error when trying to convert heartbeat to JSON: %v", err.Error())
							}
						}
					} else {
						log.Printf("Error retrieving notification channels: %v", err)
					}
				}
				time.Sleep(time.Duration(monitor.Frequency) * time.Second)
			}
		}
	}()
}

func StopGoroutine(id int) {
	mutex.Lock()
	defer mutex.Unlock()

	if stopCh, exists := goroutines[id]; exists {
		close(stopCh)
	} else {
		fmt.Printf("Goroutine with ID %d not found\n", id)
	}
}

func StartGoroutineSetup() {
	monitors, err := queries.RetrieveMonitors()
	if err != nil {
		log.Println("Error when trying to retrieve monitors")
		log.Println(err.Error())
	}

	for _, v := range monitors {
		if v.Status != "yellow" {
			StartGoroutine(v)
		}
	}
}
