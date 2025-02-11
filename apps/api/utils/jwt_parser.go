package utils

import (
	"errors"
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type Payload struct {
	Username  string
	ExpiresAt time.Time
}

func VerifyToken(refreshToken string) (*Payload, error) {
	token, err := jwt.Parse(refreshToken, jwtKeyFunc)
	if err != nil {
		log.Println("jwt.Parse:", err)
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	username, ok := claims["username"].(string)
	if !ok {
		return nil, errors.New("invalid username claim")
	}

	expRaw, ok := claims["exp"]
	if !ok {
		return nil, errors.New("missing expiration time")
	}

	exp, ok := expRaw.(float64)
	if !ok {
		return nil, errors.New("invalid expiration time type")
	}

	return &Payload{
		Username:  username,
		ExpiresAt: time.Unix(int64(exp), 0),
	}, nil
}

func jwtKeyFunc(token *jwt.Token) (interface{}, error) {
	secretKey := os.Getenv("JWT_SECRET_KEY")
	if secretKey == "" {
		return nil, errors.New("JWT_SECRET_KEY not set")
	}
	return []byte(secretKey), nil
}
