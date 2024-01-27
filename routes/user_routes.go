package routes

import (
	"github.com/chamanbravo/upstat/controllers"
	"github.com/chamanbravo/upstat/middleware"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	route := app.Group("/api/users")

	route.Get("/setup", controllers.Setup)
	route.Post("/update-password", middleware.Protected, controllers.UpdatePassword)
	route.Patch("/update/:username", middleware.Protected, controllers.UpdateAccount)
}
