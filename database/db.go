package database

import (
	"database/sql"
	"embed"
	"fmt"
	"os"

	_ "github.com/lib/pq"
	"github.com/pressly/goose/v3"
)

var DB *sql.DB

//go:embed migrations/*.sql
var embedMigrations embed.FS

func DBConnect() error {
	dbType := os.Getenv("DB_TYPE")
	var err error

	switch dbType {
	case "postgres":
		DB, err = PostgresConnection()
	case "sqlite":
		DB, err = SqliteConnection()
	default:
		DB, err = SqliteConnection()
	}

	if err != nil {
		return fmt.Errorf("could not connect to database: %v", err)
	}

	if err = DB.Ping(); err != nil {
		panic(err)
	}

	goose.SetBaseFS(embedMigrations)

	if err := goose.SetDialect(dbType); err != nil {
		panic(err)
	}

	if err := goose.Up(DB, "migrations"); err != nil {
		panic(err)
	}

	return nil
}
