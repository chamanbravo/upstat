package queries

import (
	"database/sql"
	"log"

	"github.com/chamanbravo/upstat/database"
	"github.com/chamanbravo/upstat/models"
	"github.com/chamanbravo/upstat/serializers"
)

func SaveUser(u *serializers.UserSignUp) error {
	stmt, err := database.DB.Prepare("INSERT INTO users(username, email, password) VALUES($1, $2, crypt($3, gen_salt('bf')))")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(u.Username, u.Email, u.Password)
	if err != nil {
		log.Println("Error when trying to save user")
		log.Println(err)
		return err
	}

	return nil
}

func FindUserByUsernameAndEmail(u *serializers.UserSignUp) (*models.User, error) {
	stmt, err := database.DB.Prepare("SELECT id, username, email FROM users WHERE username = $1 OR email = $2")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	user := new(models.User)
	result := stmt.QueryRow(u.Username, u.Email).Scan(&user.ID, &user.Username, &user.Email)
	if result != nil {
		if result == sql.ErrNoRows {
			return nil, nil
		}
		log.Println("Error when trying to find user")
		log.Println(err)
		return nil, err
	}
	return user, nil
}

func FindUserByUsernameAndPassword(u *serializers.UserSignIn) (*models.User, error) {
	stmt, err := database.DB.Prepare("SELECT id, username, email FROM users WHERE username = $1 AND password = crypt($2, password)")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	user := new(models.User)
	result := stmt.QueryRow(u.Username, u.Password).Scan(&user.ID, &user.Username, &user.Email)
	if result != nil {
		if result == sql.ErrNoRows {
			return nil, nil
		}
		log.Println("Error when trying to find user")
		log.Println(err)
		return nil, err
	}
	return user, nil
}

func FindUserByUsername(username string) (*models.User, error) {
	stmt, err := database.DB.Prepare("SELECT id, username, email FROM users WHERE username = $1")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	user := new(models.User)
	result := stmt.QueryRow(username).Scan(&user.ID, &user.Username, &user.Email)
	if result != nil {
		if result == sql.ErrNoRows {
			return nil, nil
		}
		log.Println("Error when trying to find user")
		log.Println(err)
		return nil, err
	}
	return user, nil
}
