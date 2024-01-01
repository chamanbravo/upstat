package controllers

import (
	"github.com/chamanbravo/upstat/queries"
	"github.com/chamanbravo/upstat/utils"
	"github.com/gofiber/fiber/v2"
)

// RefreshToken method for renew access and refresh tokens.
// @Description Renew access and refresh tokens.
// @Summary renew access and refresh tokens
// @Tags Auth
// @Accept json
// @Produce json
// @Success 200 {object} serializers.SuccessResponse
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/auth/refresh-token [post]
func RefreshToken(c *fiber.Ctx) error {
	refreshToken := c.Get("refresh_token")
	if refreshToken == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "refresh token not found",
		})
	}

	payload, _ := utils.VerifyToken(refreshToken)

	username := payload.Username

	existingUser, err := queries.FindUserByUsername(username)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}
	if existingUser == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error":   "Unauthorized",
			"message": "User not found",
		})
	}

	tokens, err := utils.GenerateJWT(existingUser.Username)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	accessToken := fiber.Cookie{
		Name:     "access_token",
		Value:    tokens.AccessToken,
		HTTPOnly: true,
	}

	newRefreshToken := fiber.Cookie{
		Name:     "refresh_token",
		Value:    tokens.RefreshToken,
		HTTPOnly: true,
	}
	c.Cookie(&accessToken)
	c.Cookie(&newRefreshToken)

	return c.JSON(fiber.Map{
		"message": "refreshed token",
	})
}
