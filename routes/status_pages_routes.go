package routes

import (
	"github.com/chamanbravo/upstat/controllers"
	"github.com/chamanbravo/upstat/middleware"

	"github.com/gofiber/fiber/v2"
)

// @Group StatusPages
func StatusPagesRoutes(app *fiber.App) {
	route := app.Group("/api/status-pages", middleware.Protected)

	route.Post("/create", controllers.CreateStatusPage)
	route.Get("/list", controllers.ListStatusPages)
	route.Delete("/delete/:id", controllers.DeleteStatusPage)
	route.Put("/update/:id", controllers.UpdateStatusPage)
	route.Get("/info/:id", controllers.StatusPageInfo)
	route.Get("/summary/:slug", controllers.StatusSummary)
}
