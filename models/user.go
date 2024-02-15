package models

import "database/sql"

type User struct {
	ID        string         `json:"id"`
	Username  string         `json:"username"`
	Email     string         `json:"email"`
	Firstname sql.NullString `json:"firstname"`
	Lastname  sql.NullString `json:"lastname"`
	Password  string         `json:"password"`
}
