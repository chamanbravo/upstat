package utils

import "golang.org/x/crypto/bcrypt"

func HashPassword(p string) string {
	bytePwd := []byte(p)

	hash, err := bcrypt.GenerateFromPassword(bytePwd, bcrypt.MinCost)
	if err != nil {
		return err.Error()
	}

	return string(hash)
}

func ComparePassword(hashedPwd, inputPwd string) bool {
	byteHash := []byte(hashedPwd)
	bytePwd := []byte(inputPwd)

	if err := bcrypt.CompareHashAndPassword(byteHash, bytePwd); err != nil {
		return false
	}

	return true
}
