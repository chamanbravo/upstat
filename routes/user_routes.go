package routes

import (
	"github.com/chamanbravo/upstat/controllers"

	"github.com/gofiber/fiber/v2"
)

func UserRoutes(app *fiber.App) {
	route := app.Group("/api/users")

	route.Get("/setup", controllers.Setup)
}
