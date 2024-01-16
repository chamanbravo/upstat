package models

type Monitor struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Url       string `json:"url"`
	Method    string `json:"method"`
	Frequency int    `json:"frequency"`
	Timeout   int    `json:"timeout"`
	Type      string `json:"type"`
}
