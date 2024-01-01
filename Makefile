build:
	go build -o server main.go

run: build
	./server

dev:
	air

swag:
	swag init