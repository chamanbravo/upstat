package controllers

import (
	"github.com/chamanbravo/upstat/database"
	"github.com/chamanbravo/upstat/models"
	"github.com/chamanbravo/upstat/utils"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func RefreshToken(c *fiber.Ctx) error {
	refreshToken := c.Get("refresh_token")
	if refreshToken == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "refresh token not found",
		})
	}

	payload, _ := utils.VerifyToken(refreshToken)

	username := payload.Username
	coll := database.GetDBCollection("users")

	existingUser := models.User{}

	err := coll.FindOne(c.Context(), bson.M{"username": username}).Decode(&existingUser)
	if err != nil {
		return c.JSON(fiber.Map{
			"message": "user with givern id not found",
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
