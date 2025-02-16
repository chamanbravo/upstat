package routes

import (
	"github.com/chamanbravo/upstat/controllers"
	"github.com/chamanbravo/upstat/middleware"

	"github.com/gofiber/fiber/v2"
)

// @Group Users
func UserRoutes(app *fiber.App) {
	route := app.Group("/api/users")

	route.Get("/setup", controllers.Setup)
	route.Post("/update-password", middleware.Protected, controllers.UpdatePassword)
	route.Patch("/me", middleware.Protected, controllers.UpdateAccount)
}
