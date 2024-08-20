package routes

import (
	"github.com/chamanbravo/upstat/controllers"
	"github.com/chamanbravo/upstat/middleware"

	"github.com/gofiber/fiber/v2"
)

// @Group Monitors
func MonitorRoutes(app *fiber.App) {
	route := app.Group("/api/monitors", middleware.Protected)

	route.Post("", controllers.CreateMonitor)
	route.Get("", controllers.MonitorsList)
	route.Get("/:id", controllers.MonitorInfo)
	route.Patch("/:id", controllers.UpdateMonitor)
	route.Delete("/:id", controllers.DeleteMonitor)
	route.Patch(":id/pause", controllers.PauseMonitor)
	route.Patch(":id/resume", controllers.ResumeMonitor)
	route.Get("/:id/summary", controllers.MonitorSummary)
	route.Get("/:id/heartbeat", controllers.RetrieveHeartbeat)
	route.Get("/:id/cert-exp-countdown", controllers.CertificateExpiryCountDown)
	route.Get("/:id/notifications", controllers.NotificationChannelListOfMonitor)
	route.Get("/:id/status-pages", controllers.StatusPagesListOfMonitor)
}
