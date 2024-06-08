package utils

import (
	"golang.org/x/crypto/bcrypt"
)

func HashAndSalt(text string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(text), bcrypt.DefaultCost)
	return string(hash), err
}

func CheckHash(hash string, input string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(input))
	return err
}
