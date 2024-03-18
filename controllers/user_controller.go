package controllers

import (
	"github.com/chamanbravo/upstat/queries"
	"github.com/chamanbravo/upstat/serializers"
	"github.com/chamanbravo/upstat/utils"
	"github.com/gofiber/fiber/v2"
)

// @Accept json
// @Produce json
// @Success 200 {object} serializers.NeedSetup
// @Failure 400 {object} serializers.ErrorResponse
// @Router /api/users/setup [get]
func Setup(c *fiber.Ctx) error {
	usersCount, err := queries.UsersCount()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"needSetup": !(usersCount > 0),
	})
}

// @Accept json
// @Produce json
// @Param body body serializers.UpdatePasswordIn true "Body"
// @Success 200 {object} serializers.SuccessResponse
// @Failure 400 {object} serializers.ErrorResponse
// @Router /api/users/update-password [post]
func UpdatePassword(c *fiber.Ctx) error {
	updatePasswordBody := new(serializers.UpdatePasswordIn)
	if err := c.BodyParser(updatePasswordBody); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
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

	user, err := queries.FindUserByUsername(username)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}
	if user == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "Not found",
			"message": "User does not exist",
		})
	}

	if err = utils.CheckHash(user.Password, updatePasswordBody.CurrentPassword); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid current password",
		})
	}

	hashedNewPassword, err := utils.HashAndSalt(updatePasswordBody.NewPassword)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	err = queries.UpdatePassword(username, hashedNewPassword)
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
// @Param body body serializers.UpdateAccountIn true "Body"
// @Success 200 {object} serializers.SuccessResponse
// @Failure 400 {object} serializers.ErrorResponse
// @Router /api/users/{username} [patch]
func UpdateAccount(c *fiber.Ctx) error {
	username := c.Params("username")
	if username == "" {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "Username parameter is missing",
		})
	}

	updateAccountBody := new(serializers.UpdateAccountIn)
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
