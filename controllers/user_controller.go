package controllers

import (
	"github.com/chamanbravo/upstat/dto"
	"github.com/chamanbravo/upstat/queries"
	"github.com/chamanbravo/upstat/utils"
	"github.com/gofiber/fiber/v2"
)

// @Accept json
// @Produce json
// @Success 200 {object} dto.NeedSetup
// @Failure 400 {object} dto.ErrorResponse
// @Router /api/users/setup [get]
func Setup(c *fiber.Ctx) error {
	usersCount, err := queries.UsersCount()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"needSetup": usersCount <= 0,
	})
}

// @Accept json
// @Produce json
// @Param body body dto.UpdatePasswordIn true "Body"
// @Success 200 {object} dto.SuccessResponse
// @Failure 400 {object} dto.ErrorResponse
// @Router /api/users/update-password [post]
func UpdatePassword(c *fiber.Ctx) error {
	updatePasswordBody := new(dto.UpdatePasswordIn)
	if err := c.BodyParser(updatePasswordBody); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	errors := utils.BodyValidator.Validate(updatePasswordBody)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	username := c.Locals("username").(string)

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

// @Accept json
// @Produce json
// @Param username path string true "Username"
// @Param body body dto.UpdateAccountIn true "Body"
// @Success 200 {object} dto.SuccessResponse
// @Failure 400 {object} dto.ErrorResponse
// @Router /api/users/me [patch]
func UpdateAccount(c *fiber.Ctx) error {
	username := c.Locals("username").(string)
	if username == "" {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "Username parameter is missing",
		})
	}

	updateAccountBody := new(dto.UpdateAccountIn)
	if err := c.BodyParser(updateAccountBody); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	errors := utils.BodyValidator.Validate(updateAccountBody)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	err := queries.UpdateAccount(username, updateAccountBody)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Account updated successfully.",
	})
}
