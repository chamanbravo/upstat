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

//go:embed migrations/sqlite/*.sql
var embedMigrationsSqlite embed.FS

//go:embed migrations/postgres/*.sql
var embedMigrationsPostgres embed.FS

func DBConnect() error {
	dbType := os.Getenv("DB_TYPE")
	if dbType == "" {
		dbType = "sqlite"
	}
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

	switch dbType {
	case "postgres":
		goose.SetBaseFS(embedMigrationsPostgres)
	case "sqlite":
		goose.SetBaseFS(embedMigrationsSqlite)
	default:
		goose.SetBaseFS(embedMigrationsSqlite)
	}

	if err := goose.SetDialect(dbType); err != nil {
		panic(err)
	}

	dbMigrationDir := fmt.Sprintf("migrations/%s", dbType)
	if err := goose.Up(DB, dbMigrationDir); err != nil {
		panic(err)
	}

	return nil
}
