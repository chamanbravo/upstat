package controllers

import (
	"github.com/chamanbravo/upstat/queries"
	"github.com/chamanbravo/upstat/serializers"
	"github.com/chamanbravo/upstat/utils"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

var validate = validator.New()

func SignUp(c *fiber.Ctx) error {
	user := new(serializers.UserSignUp)
	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid body",
		})
	}

	errors := utils.BodyValidator.Validate(user)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	existingUser, err := queries.FindUserByUsernameAndEmail(user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	if existingUser != nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error":   "Conflict",
			"message": "User with this username or email already exists",
		})
	}

	if err := queries.SaveUser(user); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	tokens, err := utils.GenerateJWT(user.Username)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	accessToken := fiber.Cookie{
		Name:     "access_token",
		Value:    tokens.AccessToken,
		HTTPOnly: true,
	}
	refreshToken := fiber.Cookie{
		Name:     "refresh_token",
		Value:    tokens.RefreshToken,
		HTTPOnly: true,
	}
	c.Cookie(&accessToken)
	c.Cookie(&refreshToken)

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
		"user": fiber.Map{
			"username": user.Username,
			"email":    user.Email,
		},
	})
}

func SignIn(c *fiber.Ctx) error {
	user := new(serializers.UserSignIn)
	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid body",
		})
	}

	errors := utils.BodyValidator.Validate(user)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	existingUser, err := queries.FindUserByUsernameAndPassword(user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}
	if existingUser == nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error":   "Not found",
			"message": "Invalid username or password",
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
	refreshToken := fiber.Cookie{
		Name:     "refresh_token",
		Value:    tokens.RefreshToken,
		HTTPOnly: true,
	}
	c.Cookie(&accessToken)
	c.Cookie(&refreshToken)

	return c.JSON(fiber.Map{"message": "success", "user": fiber.Map{
		"username": existingUser.Username,
		"email":    existingUser.Email,
	}})
}

func SignOut(c *fiber.Ctx) error {
	c.ClearCookie("access_token")
	c.ClearCookie("refresh_token")

	return c.JSON(fiber.Map{
		"message": "success",
	})
}
