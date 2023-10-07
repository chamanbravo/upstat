package routes

import (
	"github.com/chamanbravo/upstat/app/controllers"
	"github.com/gofiber/fiber/v2"
)

func MonitorRoutes(app *fiber.App) {
	route := app.Group("/api/monitor")

	route.Post("/add", controllers.AddMonitor)
	route.Get("/list", controllers.ListMonitor)
	route.Put("/edit/:name", controllers.EditMonitor)
}
