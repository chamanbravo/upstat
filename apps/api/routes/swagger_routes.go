package routes

import (
	"github.com/gofiber/fiber/v2"

	swagger "github.com/gofiber/swagger"
)

func SwaggerRoute(a *fiber.App) {
	route := a.Group("/swagger")

	route.Get("*", swagger.HandlerDefault)
}
