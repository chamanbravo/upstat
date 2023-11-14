package routes

import (
	"github.com/chamanbravo/upstat/controllers"
	"github.com/chamanbravo/upstat/middleware"
	"github.com/gofiber/fiber/v2"
)

func MonitorRoutes(app *fiber.App) {
	route := app.Group("/api/monitor")

	route.Post("/add", middleware.Protected, controllers.AddMonitor)
	route.Get("/list", middleware.Protected, controllers.ListMonitor)
	route.Put("/edit/:id", middleware.Protected, controllers.EditMonitor)
}
