package utils

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type Tokens struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
}

func GenerateJWT(username string, firstname, lastname string) (*Tokens, error) {
	accessToken, err := generateAccessToken(username, firstname, lastname)
	if err != nil {
		return nil, err
	}

	refreshToken, err := generateNewRefreshToken(username, firstname, lastname)
	if err != nil {
		return nil, err
	}

	return &Tokens{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func generateAccessToken(username string, firstname, lastname string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = username
	claims["firstname"] = firstname
	claims["lastname"] = lastname
	claims["exp"] = time.Now().Add(time.Hour).Unix()

	secretKey := []byte(os.Getenv("JWT_SECRET_KEY"))

	accessToken, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return accessToken, nil
}

func generateNewRefreshToken(username string, firstname, lastname string) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = username
	claims["firstname"] = firstname
	claims["lastname"] = lastname
	claims["exp"] = time.Now().Add(time.Hour * 5).Unix()

	secretKey := []byte(os.Getenv("JWT_SECRET_KEY"))

	accessToken, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return accessToken, nil
}
