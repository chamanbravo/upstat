package models

type Monitor struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Url       string `json:"url"`
	Type      string `json:"type"`
	Method    string `json:"method"`
	Frequency int    `json:"frequency"`
	Status    string `json:"status"`
}
