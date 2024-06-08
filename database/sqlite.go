package database

import (
	"database/sql"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

func SqliteConnection() (*sql.DB, error) {
	sqliteInfo := os.Getenv("SQLITE_DSN")
	db, err := sql.Open("sqlite3", sqliteInfo)
	return db, err
}
