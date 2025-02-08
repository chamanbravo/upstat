package routes

import (
	"github.com/chamanbravo/upstat/controllers"
	"github.com/chamanbravo/upstat/middleware"

	"github.com/gofiber/fiber/v2"
)

// @Group StatusPages
func StatusPagesRoutes(app *fiber.App) {
	route := app.Group("/api/status-pages")
	route.Get("/:slug/summary", controllers.StatusSummary)

	protectedRoutes := route.Group("", middleware.Protected)
	protectedRoutes.Post("", controllers.CreateStatusPage)
	protectedRoutes.Get("", controllers.ListStatusPages)
	protectedRoutes.Delete("/:id", controllers.DeleteStatusPage)
	protectedRoutes.Patch("/:id", controllers.UpdateStatusPage)
	protectedRoutes.Get("/:id", controllers.StatusPageInfo)
}
