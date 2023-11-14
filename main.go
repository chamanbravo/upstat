package main

import (
	"github.com/chamanbravo/upstat/database"
	"github.com/chamanbravo/upstat/routes"
	"github.com/joho/godotenv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	godotenv.Load(".env")

	database.InitDB()
	defer database.CloseDB()

	app := fiber.New()
	app.Use(logger.New())

	routes.AuthRoutes(app)
	routes.MonitorRoutes(app)

	app.Listen(":8000")
}
