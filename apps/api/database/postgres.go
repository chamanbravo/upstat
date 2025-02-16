package database

import (
	"database/sql"
	"os"

	_ "github.com/lib/pq"
)

func PostgresConnection() (*sql.DB, error) {
	psqlInfo := os.Getenv("POSTGRES_DSN")
	db, err := sql.Open("postgres", psqlInfo)
	return db, err
}
