package middleware

import (
	"github.com/chamanbravo/upstat/utils"
	"github.com/gofiber/fiber/v2"
)

// Protected protects routes
func Protected(c *fiber.Ctx) error {
	token := c.Cookies("access_token")

	_, err := utils.VerifyToken(token)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
			"error":   err.Error(),
		})
	}

	return c.Next()
}
