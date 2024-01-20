package utils

import (
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
					fmt.Printf("Goroutine with ID %d is running...\n", id)
					startTime := time.Now()
					response, err := http.Get(monitor.Url)
					if err != nil {
						heartbeat.Status = "error"
						heartbeat.Message = "unable to ping"
						heartbeat.Latency = 0
						if monitor.Status != "red" {
							err := queries.UpdateMonitorStatus(monitor.ID, "red")
							if err != nil {
								log.Printf("Error when trying to update monitor status: %v", err.Error())
							}
						}
					} else {
						heartbeat.Status = strings.Split(response.Status, " ")[0]
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
					err = queries.SaveHeartbeat(heartbeat)
					if err != nil {
						log.Printf("Error when trying to save heartbeat: %v", err.Error())
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
		StartGoroutine(v)
	}
}
