package database

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

func SqliteConnection() (*sql.DB, error) {
	sqliteDSN := "upstat.db"
	db, err := sql.Open("sqlite3", sqliteDSN)

	ddl := "PRAGMA journal_mode = WAL;" +
		"PRAGMA synchronous = NORMAL;" +
		"PRAGMA cache_size = -64000;" +
		"PRAGMA mmap_size = 134217728;" +
		"PRAGMA journal_size_limit = 27103364;" +
		"PRAGMA temp_store = MEMORY;" +
		"PRAGMA foreign_keys = ON;"

	_, err = db.Exec(ddl)

	return db, err
}
