package models

type Monitor struct {
	ID        string `json:"id" bson:"_id"`
	Name      string `json:"name" bson:"name"`
	Url       string `json:"url" bson:"url"`
	Method    string `json:"method" bson:"method"`
	Heartbeat string `json:"heartbeat" bson:"heartbeat"`
}
