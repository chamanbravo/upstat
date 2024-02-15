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

func FindUserByUsernameAndPassword(username, password string) (*models.User, error) {
	stmt, err := database.DB.Prepare("SELECT id, username, email, firstname, lastname FROM users WHERE username = $1 AND password = crypt($2, password)")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	user := new(models.User)
	result := stmt.QueryRow(username, password).Scan(&user.ID, &user.Username, &user.Email, &user.Firstname, &user.Lastname)
	if result != nil {
		if result == sql.ErrNoRows {
			return nil, nil
		}
		log.Println("Error when trying to find user")
		log.Println(result)
		return nil, result
	}
	return user, nil
}

func FindUserByUsername(username string) (*models.User, error) {
	stmt, err := database.DB.Prepare("SELECT id, username, email, firstname, lastname FROM users WHERE username = $1")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return nil, err
	}
	defer stmt.Close()

	user := new(models.User)
	result := stmt.QueryRow(username).Scan(&user.ID, &user.Username, &user.Email, &user.Firstname, &user.Lastname)
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

func UsersCount() (int, error) {
	stmt, err := database.DB.Prepare("SELECT COUNT(*) FROM users")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return -1, err
	}
	defer stmt.Close()

	var count int
	err = stmt.QueryRow().Scan(&count)
	if err != nil {
		log.Println("Error when trying to retrieve user count")
		log.Println(err)
		return -1, err
	}

	return count, nil
}

func UpdatePassword(username string, u *serializers.UpdatePasswordIn) error {
	stmt, err := database.DB.Prepare("UPDATE users SET password = crypt($2, gen_salt('bf')) WHERE username = $1 AND password = crypt($3, password)")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(username, u.CurrentPassword, u.NewPassword)
	if err != nil {
		log.Println("Error when trying to update password")
		log.Println(err)
		return err
	}

	return nil
}

func UpdateAccount(username string, u *serializers.UpdateAccountIn) error {
	stmt, err := database.DB.Prepare("UPDATE users SET firstname = $1, lastname = $2 WHERE username = $3")
	if err != nil {
		log.Println("Error when trying to prepare statement")
		log.Println(err)
		return err
	}
	defer stmt.Close()

	_, err = stmt.Exec(u.Firstname, u.Lastname, username)
	if err != nil {
		log.Println("Error when trying to update password")
		log.Println(err)
		return err
	}

	return nil
}
