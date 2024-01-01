package main

import (
	"log"

	"github.com/chamanbravo/upstat/database"
	"github.com/chamanbravo/upstat/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file", err)
	}

	app := fiber.New()
	app.Use(logger.New())

	if err := database.DBConnect(); err != nil {
		log.Fatal("Could not connect to database", err)
	}

	routes.AuthRoutes(app)

	app.Listen(":8000")
}
