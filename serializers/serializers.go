package serializers

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
	Name      string `json:"name" validate:"required"`
	URL       string `json:"url" validate:"required"`
	Type      string `json:"type" validate:"required"`
	Frequency int    `json:"frequency" validate:"required"`
	Method    string `json:"method" validate:"required"`
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
