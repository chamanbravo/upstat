package controllers

import (
	"github.com/chamanbravo/upstat/queries"
	"github.com/gofiber/fiber/v2"
)

// @Tags Auth
// @Accept json
// @Produce json
// @Router /api/users/setup [get]
func Setup(c *fiber.Ctx) error {
	usersCount, err := queries.UsersCount()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"needSetup": !(usersCount > 0),
	})
}
