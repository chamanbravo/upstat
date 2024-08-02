package routes

import (
	"github.com/chamanbravo/upstat/controllers"
	"github.com/chamanbravo/upstat/middleware"
	"github.com/gofiber/fiber/v2"
)

// @Group Notifications
func NotificationRoutes(app *fiber.App) {
	route := app.Group("/api/notifications", middleware.Protected)

	route.Post("", controllers.CreateNotification)
	route.Get("", controllers.ListNotificationsChannel)
	route.Delete("/:id", controllers.DeleteNotificationChannel)
	route.Patch("/:id", controllers.UpdateNotificationChannel)
	route.Get("/:id", controllers.NotificationChannelInfo)
}
