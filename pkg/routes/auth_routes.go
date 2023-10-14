package routes

import (
	"github.com/chamanbravo/upstat/app/controllers"
	"github.com/chamanbravo/upstat/app/middleware"

	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(app *fiber.App) {
	route := app.Group("/api/auth")

	route.Post("/signup", controllers.SignUp)
	route.Post("/signin", controllers.SignIn)
	route.Post("/signout", controllers.SignOut)
	route.Post("/refresh-token", middleware.Protected, controllers.RefreshToken)
}
