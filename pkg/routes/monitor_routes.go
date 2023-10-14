package routes

import (
	"github.com/chamanbravo/upstat/app/controllers"
	"github.com/chamanbravo/upstat/app/middleware"
	"github.com/gofiber/fiber/v2"
)

func MonitorRoutes(app *fiber.App) {
	route := app.Group("/api/monitor")

	route.Post("/add", middleware.Protected, controllers.AddMonitor)
	route.Get("/list", middleware.Protected, controllers.ListMonitor)
	route.Put("/edit/:name", middleware.Protected, controllers.EditMonitor)
}
