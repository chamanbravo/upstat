package utils

import (
	"log"
	"os"

	"github.com/golang-jwt/jwt/v4"
)

type payload struct {
	Username  string
	ExpiresAt float64
}

func VerifyToken(refreshToken string) (*payload, error) {
	token, err := jwt.Parse(refreshToken, jwtKeyFunc)
	if err != nil {
		log.Println("jwt.Parse:", err)
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, err
	}

	username := claims["username"].(string)
	expiresAt := claims["exp"].(float64)

	return &payload{
		Username:  username,
		ExpiresAt: expiresAt,
	}, nil
}

func jwtKeyFunc(token *jwt.Token) (interface{}, error) {
	return []byte(os.Getenv("JWT_SECRET_KEY")), nil
}
