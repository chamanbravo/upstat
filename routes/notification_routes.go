package routes

import (
	"github.com/chamanbravo/upstat/controllers"
	"github.com/chamanbravo/upstat/middleware"
)

// @Group Notifications
func NotificationRoutes(app *fiber.App) {
	//use auth middleware
	route := app.Group("/api/notifications", middleware.Protected())

	route.Post("/create", controllers.CreateNotification)
	route.Get("/list", controllers.ListNotificationsChannel)
	route.Delete("/delete/:id", controllers.DeleteNotificationChannel)
	route.Put("/update/:id", controllers.UpdateNotificationChannel)
	route.Get("/info/:id", controllers.NotificationChannelInfo)
}
