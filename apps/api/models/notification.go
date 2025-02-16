package models

type NotificationData struct {
	WebhookUrl string `json:"webhookUrl"`
}

type Notification struct {
	ID       string           `json:"id"`
	Name     string           `json:"name"`
	Provider string           `json:"provider"`
	Data     NotificationData `json:"data"`
}
