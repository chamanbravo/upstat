package controllers

import (
	"github.com/chamanbravo/upstat/queries"
	"github.com/chamanbravo/upstat/serializers"
	"github.com/chamanbravo/upstat/utils"
	"github.com/gofiber/fiber/v2"
)

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

// @Accept json
// @Produce json
// @Router /api/users/update-password [post]
func UpdatePassword(c *fiber.Ctx) error {
	updatePasswordBody := new(serializers.UpdatePasswordIn)
	if err := c.BodyParser(updatePasswordBody); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "Invalid body",
			"message": err.Error(),
		})
	}

	errors := utils.BodyValidator.Validate(updatePasswordBody)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	token := c.Cookies("access_token")
	if token == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "token not found",
		})
	}

	payload, err := utils.VerifyToken(token)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	username := payload.Username

	user, err := queries.FindUserByUsernameAndPassword(username, updatePasswordBody.CurrentPassword)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}
	if user == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "Not found",
			"message": "Invalid current password",
		})
	}

	err = queries.UpdatePassword(username, updatePasswordBody)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
	})
}
