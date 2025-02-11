package middleware

import (
	"strings"

	"github.com/chamanbravo/upstat/utils"
	"github.com/gofiber/fiber/v2"
)

func Protected(c *fiber.Ctx) error {
	authHeader := c.GetReqHeaders()["Authorization"]

	if len(authHeader) == 0 {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
			"error":   "Invalid authorization header format",
		})
	}

	token := strings.Split(authHeader[0], " ")
	if len(token) != 2 || token[0] != "Bearer" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
			"error":   "Invalid authorization header format",
		})
	}

	user, err := utils.VerifyToken(token[1])
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"message": "Unauthorized",
			"error":   err.Error(),
		})
	}

	c.Locals("username", user.Username)
	return c.Next()
}
