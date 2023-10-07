package controllers

import (
	"log"

	"github.com/chamanbravo/upstat/app/models"
	"github.com/chamanbravo/upstat/pkg/utils"
	"github.com/chamanbravo/upstat/platform/database"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

type UserSignUp struct {
	Username string `json:"username" validate:"required,min=3,max=32"`
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required,min=8,max=32"`
}

var validate = validator.New()

func SignUp(c *fiber.Ctx) error {
	user := new(UserSignUp)
	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid body",
		})
	}

	if err := validate.Struct(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	existingUser := models.User{}
	coll := database.GetDBCollection("users")

	err := coll.FindOne(c.Context(), bson.M{"$or": bson.A{
		bson.M{"email": user.Email},
		bson.M{"username": user.Username},
	}}).Decode(&existingUser)

	if err != nil {
		log.Println(err)
	}

	if existingUser.Username != "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User already exists",
		})
	}

	user.Password = utils.HashPassword(user.Password)
	_, err = coll.InsertOne(c.Context(), user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Failed to create user",
			"error":   err.Error(),
		})
	}

	tokens, err := utils.GenerateJWT(existingUser.Username)
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

type UserSignIn struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

func SignIn(c *fiber.Ctx) error {
	user := new(UserSignIn)
	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid body",
		})
	}

	if err := validate.Struct(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	existingUser := models.User{}
	coll := database.GetDBCollection("users")
	if coll == nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "unable to get database collection",
		})
	}

	err := coll.FindOne(c.Context(), bson.M{"username": user.Username}).Decode(&existingUser)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "User does not exist",
		})
	}

	comparePassword := utils.ComparePassword(existingUser.Password, user.Password)
	if !comparePassword {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid credentials",
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
