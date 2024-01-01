package models

type Monitor struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Url       string `json:"url"`
	Method    string `json:"method"`
	Heartbeat string `json:"heartbeat"`
}
