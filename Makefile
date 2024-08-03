include .env

APP_NAME = upstat
MIGRATIONS_DIR = $(PWD)/database/migrations
export POSTGRES_DSN

dev:
	air

build:
	go build -o server main.go

clean:
	rm -rf ./server

run: build
	./server

swag:
	go-swagger3 --module-path . --output ./docs/swagger.json --schema-without-pkg

critic:
	gocritic check -enableAll ./...

security:
	gosec ./...

migrate.create:
	@read -p "Enter migration name: " name; \
	goose -dir $(MIGRATIONS_DIR) create $$name sql

migrate.up:
	goose -dir $(MIGRATIONS_DIR) postgres $(POSTGRES_DSN) up

migrate.down:
	goose -dir $(MIGRATIONS_DIR) postgres $(POSTGRES_DSN) down

migrate.reset:
	goose -dir $(MIGRATIONS_DIR) postgres $(POSTGRES_DSN) reset