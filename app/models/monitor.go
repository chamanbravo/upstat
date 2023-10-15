package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Monitor struct {
	ID        primitive.ObjectID `json:"id" bson:"_id,omitempty"`
	Name      string             `json:"name" bson:"name"`
	Url       string             `json:"url" bson:"url"`
	Method    string             `json:"method" bson:"method"`
	Heartbeat string             `json:"heartbeat" bson:"heartbeat"`
}
