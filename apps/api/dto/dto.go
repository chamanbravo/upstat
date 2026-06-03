package dto

import (
	"time"

	"github.com/chamanbravo/upstat/models"
)

type SuccessResponse struct {
	Message string `json:"message"`
}

type ErrorResponse struct {
	Message string `json:"message"`
}

type UserSignUp struct {
	Username string `json:"username" validate:"required,min=3,max=32"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=32"`
}

type UserSignIn struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type User struct {
	Username  string `json:"username"`
	Email     string `json:"email"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
}

type UserSignInOut struct {
	SuccessResponse
	User User `json:"user"`
}

type AddMonitorIn struct {
	Name                 string   `json:"name" validate:"required"`
	URL                  string   `json:"url" validate:"required"`
	Type                 string   `json:"type" validate:"required"`
	Frequency            int      `json:"frequency" validate:"required"`
	Method               string   `json:"method" validate:"required"`
	NotificationChannels []string `json:"notificationChannels"`
	StatusPages          []string `json:"statusPages"`
}

type UpdatePasswordIn struct {
	CurrentPassword string `json:"currentPassword" validate:"required"`
	NewPassword     string `json:"newPassword" validate:"required,min=8,max=32"`
}

type UpdateAccountIn struct {
	Firstname string `json:"firstname" validate:"required,min=2,max=32"`
	Lastname  string `json:"lastname" validate:"required,min=2,max=32"`
}

type HeartbeatsOut struct {
	Message    string             `json:"message"`
	Heartbeats []models.Heartbeat `json:"heartbeat"`
}

type MonitorItem struct {
	ID         string             `json:"id"`
	Name       string             `json:"name"`
	URL        string             `json:"url"`
	Frequency  int                `json:"frequency"`
	Status     string             `json:"status"`
	Heartbeats []models.Heartbeat `json:"heartbeat"`
}

type MonitorsListOut struct {
	Message  string        `json:"message"`
	Monitors []MonitorItem `json:"monitors"`
}

type NeedSetup struct {
	NeedSetup bool `json:"needSetup"`
}

type MonitorInfoOut struct {
	SuccessResponse
	Monitor models.Monitor `json:"monitor"`
}

type RetrieveHeartbeatIn struct {
	StartTime time.Time `query:"startTime"`
}

type MonitorSummary struct {
	AverageLatency float64 `json:"averageLatency"`
	DayUptime      float64 `json:"dayUptime"`
	MonthUptime    float64 `json:"monthUptime"`
}

type MonitorSummaryOut struct {
	SuccessResponse
	Summary MonitorSummary `json:"summary"`
}

type MonitorAvailability struct {
	Today      float64 `json:"today"`
	Last7Days  float64 `json:"last7Days"`
	Last30Days float64 `json:"last30Days"`
	Last365Days float64 `json:"last365Days"`
}

type MonitorDowntime struct {
	Today       int `json:"today"`
	Last7Days   int `json:"last7Days"`
	Last30Days  int `json:"last30Days"`
	Last365Days int `json:"last365Days"`
}

type MonitorAvailabilityOut struct {
	SuccessResponse
	Availability MonitorAvailability `json:"availability"`
	Downtime     MonitorDowntime     `json:"downtime"`
}

type CertificateExpiryCountDown struct {
	SuccessResponse
	DaysUntilExpiration int `json:"daysUntilExpiration"`
}

type NotificationData struct {
	WebhookUrl string `json:"webhookUrl"`
}

type NotificationCreateIn struct {
	Name     string           `json:"name" validate:"required"`
	Provider string           `json:"provider" validate:"oneof=Discord Slack Telegram"`
	Data     NotificationData `json:"data"`
}

type NotificationItem struct {
	ID       string `json:"id"`
	Name     string `json:"name" validate:"required"`
	Provider string `json:"provider" validate:"oneof=Discord Slack"`
}

type NotificationListOut struct {
	SuccessResponse
	Notifications []NotificationItem `json:"notifications"`
}

type NotificationChannelInfo struct {
	SuccessResponse
	Notification models.Notification `json:"notification"`
}

type CreateStatusPageIn struct {
	Name string `json:"name"`
	Slug string `json:"slug"`
}

type StatusPageInfo struct {
	SuccessResponse
	StatusPage models.StatusPage `json:"statusPage"`
}

type ListStatusPagesOut struct {
	SuccessResponse
	StatusPages []models.StatusPage `json:"statusPages"`
}

type SaveIncident struct {
	Type        string `json:"type"`
	Description string `json:"description"`
	IsPositive  bool   `json:"is_positive"`
	MonitorId   int    `json:"monitor_id"`
}

type HeartbeatSummary struct {
	Timestamp string `json:"timestamp"`
	Total     int    `json:"total"`
	Up        int    `json:"up"`
	Down      int    `json:"down"`
}

type StatusPageMonitorSummary struct {
	ID     int                `json:"id"`
	Name   string             `json:"name"`
	Recent []models.Heartbeat `json:"recent"`
	All    []HeartbeatSummary `json:"all"`
}

type StatusPageSummary struct {
	SuccessResponse
	StatusPageInfo models.StatusPage          `json:"statusPageInfo"`
	Monitors       []StatusPageMonitorSummary `json:"monitors"`
}
