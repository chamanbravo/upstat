package main

import (
	"log"

	"github.com/chamanbravo/upstat/database"
	_ "github.com/chamanbravo/upstat/docs"
	"github.com/chamanbravo/upstat/utils"

	"github.com/chamanbravo/upstat/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	_ "github.com/joho/godotenv/autoload"
)

// @title Upstat API
// @version 1.0
// @description This is an auto-generated API Docs for Upstat API.
// @contact.email chamanpro9@gmail.com
// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
// @BasePath /api
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
func main() {
	app := fiber.New()
	app.Use(logger.New())

	if err := database.DBConnect(); err != nil {
		log.Fatal("Could not connect to database", err)
	}

	utils.StartGoroutineSetup()

	routes.AuthRoutes(app)
	routes.SwaggerRoute(app)
	routes.MonitorRoutes(app)
	routes.UserRoutes(app)
	routes.NotificationRoutes(app)

	app.Listen(":8000")
}
