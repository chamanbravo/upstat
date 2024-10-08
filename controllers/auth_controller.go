package controllers

import (
	"github.com/chamanbravo/upstat/dto"
	"github.com/chamanbravo/upstat/queries"
	"github.com/chamanbravo/upstat/utils"
	"github.com/gofiber/fiber/v2"
)

// SignUp method to create a new user.
// @Description Create a new user.
// @Summary create a new user
// @Tags Auth
// @Accept json
// @Produce json
// @Param body body dto.UserSignUp true "Body"
// @Success 200 {object} dto.UserSignInOut
// @Success 400 {object} dto.ErrorResponse
// @Router /api/auth/signup [post]
func SignUp(c *fiber.Ctx) error {
	user := new(dto.UserSignUp)
	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	errors := utils.BodyValidator.Validate(user)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	existingUser, err := queries.FindUserByUsernameAndEmail(user)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	if existingUser != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "User with this username or email already exists",
		})
	}

	hashedPassword, err := utils.HashAndSalt(user.Password)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	user.Password = hashedPassword
	if err := queries.SaveUser(user); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	tokens, err := utils.GenerateJWT(user.Username, "", "")
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	accessToken := fiber.Cookie{
		Name:  "access_token",
		Value: tokens.AccessToken,
	}
	refreshToken := fiber.Cookie{
		Name:  "refresh_token",
		Value: tokens.RefreshToken,
	}
	c.Cookie(&accessToken)
	c.Cookie(&refreshToken)

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
		"user": fiber.Map{
			"username":      user.Username,
			"email":         user.Email,
			"refresh_token": tokens.RefreshToken,
			"access_token":  tokens.AccessToken,
		},
	})
}

// SignIn method to auth user and return access and refresh tokens.
// @Description Auth user and return access and refresh token.
// @Summary auth user and return access and refresh token
// @Tags Auth
// @Accept json
// @Produce json
// @Param body body dto.UserSignIn true "Body"
// @Success 200 {object} dto.UserSignInOut
// @Success 400 {object} dto.ErrorResponse
// @Router /api/auth/signin [post]
func SignIn(c *fiber.Ctx) error {
	user := new(dto.UserSignIn)
	if err := c.BodyParser(user); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid body",
		})
	}

	errors := utils.BodyValidator.Validate(user)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	existingUser, err := queries.FindUserByUsername(user.Username)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	if existingUser == nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid username or password",
		})
	}

	if err = utils.CheckHash(existingUser.Password, user.Password); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Invalid username or password",
		})
	}

	tokens, err := utils.GenerateJWT(existingUser.Username, existingUser.Firstname, existingUser.Lastname)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	accessToken := fiber.Cookie{
		Name:  "access_token",
		Value: tokens.AccessToken,
	}
	refreshToken := fiber.Cookie{
		Name:  "refresh_token",
		Value: tokens.RefreshToken,
	}
	c.Cookie(&accessToken)
	c.Cookie(&refreshToken)

	return c.JSON(fiber.Map{"message": "success", "user": fiber.Map{
		"username":      existingUser.Username,
		"email":         existingUser.Email,
		"refresh_token": tokens.RefreshToken,
		"access_token":  tokens.AccessToken,
	}})
}

// SignOut method to signin user.
// @Description De-authorize user and delete refresh token from Redis.
// @Summary de-authorize user and delete refresh token from Redis
// @Summary refresh jwt token
// @Tags Auth
// @Accept json
// @Produce json
// @Success 200 {object} dto.SuccessResponse
// @Success 400 {object} dto.ErrorResponse
// @Router /api/auth/signout [post]
func SignOut(c *fiber.Ctx) error {
	c.ClearCookie("access_token")
	c.ClearCookie("refresh_token")

	return c.JSON(fiber.Map{
		"message": "success",
	})
}
