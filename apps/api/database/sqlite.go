package database

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func SqliteConnection() (*sql.DB, error) {
	sqliteDSN := "file:upstat.db?_pragma=journal_mode(WAL)&_pragma=synchronous(NORMAL)&_pragma=cache_size(-64000)&_pragma=temp_store(MEMORY)"
	db, err := sql.Open("sqlite3", sqliteDSN)
	return db, err
}
