package routes

import (
	"github.com/chamanbravo/upstat/controllers"
	"github.com/chamanbravo/upstat/middleware"

	"github.com/gofiber/fiber/v2"
)

func MonitorRoutes(app *fiber.App) {
	route := app.Group("/api/monitors")

	route.Post("/create", middleware.Protected, controllers.CreateMonitor)
	route.Get("/pause", middleware.Protected, controllers.PauseMonitor)
	route.Get("/resume", middleware.Protected, controllers.ResumeMonitor)
	route.Get("/list", middleware.Protected, controllers.MonitorsList)
}
