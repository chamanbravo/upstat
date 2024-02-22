package routes

import (
	"github.com/chamanbravo/upstat/controllers"
	"github.com/chamanbravo/upstat/middleware"

	"github.com/gofiber/fiber/v2"
)

// @Group Monitors
func MonitorRoutes(app *fiber.App) {
	route := app.Group("/api/monitors", middleware.Protected)

	route.Post("/create", controllers.CreateMonitor)
	route.Get("/info/:id", controllers.MonitorInfo)
	route.Put("/pause/:id", controllers.PauseMonitor)
	route.Put("/update/:id", controllers.UpdateMonitor)
	route.Delete("/delete/:id", controllers.DeleteMonitor)
	route.Put("/resume/:id", controllers.ResumeMonitor)
	route.Get("/list", controllers.MonitorsList)
	route.Get("/summary/:id", controllers.MonitorSummary)
	route.Get("/heartbeat/:id", controllers.RetrieveHeartbeat)
	route.Get("/cert-exp-countdown/:id", controllers.CertificateExpiryCountDown)
	route.Get("/:id/notifications", controllers.NotificationChannelListOfMonitor)
}
