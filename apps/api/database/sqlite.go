package database

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func SqliteConnection() (*sql.DB, error) {
	sqliteDSN := "upstat.db"
	db, err := sql.Open("sqlite3", sqliteDSN)
	return db, err
}
