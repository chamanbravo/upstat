package routes

import (
	"github.com/chamanbravo/upstat/controllers"
	"github.com/chamanbravo/upstat/middleware"

	"github.com/gofiber/fiber/v2"
)

func MonitorRoutes(app *fiber.App) {
	route := app.Group("/api/monitors")

	route.Post("/create", middleware.Protected, controllers.CreateMonitor)
	route.Get("/info/:id", middleware.Protected, controllers.MonitorInfo)
	route.Put("/pause/:id", middleware.Protected, controllers.PauseMonitor)
	route.Put("/update/:id", middleware.Protected, controllers.UpdateMonitor)
	route.Delete("/delete/:id", middleware.Protected, controllers.DeleteMonitor)
	route.Put("/resume/:id", middleware.Protected, controllers.ResumeMonitor)
	route.Get("/list", middleware.Protected, controllers.MonitorsList)
	// route.Get("/summary/:id", middleware.Protected, controllers.MonitorSummary)
	route.Get("/heartbeat/:id", middleware.Protected, controllers.RetrieveHeartbeat)
}
