package models

type Incident struct {
	ID          int    `json:"id"`
	Type        string `json:"type"`
	Description string `json:"description"`
	IsPositive  bool   `json:"is_positive"`
	MonitorId   int    `json:"monitor_id"`
}
