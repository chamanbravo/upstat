package models

import "time"

type Heartbeat struct {
	ID        int       `json:"id"`
	MonitorId int       `json:"monitor_id"`
	Timestamp time.Time `json:"timestamp"`
	Status    string    `json:"status"`
	Latency   int       `json:"latency"`
	Message   string    `json:"message"`
}
