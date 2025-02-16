package controllers

import (
	"fmt"
	"strconv"

	"github.com/chamanbravo/upstat/dto"
	"github.com/chamanbravo/upstat/queries"
	"github.com/chamanbravo/upstat/utils"
	"github.com/gofiber/fiber/v2"
)

// @Tags Notifications
// @Accept json
// @Produce json
// @Param body body dto.NotificationCreateIn true "Body"
// @Success 200 {object} dto.SuccessResponse
// @Failure 400 {object} dto.ErrorResponse
// @Router /api/notifications [post]
func CreateNotification(c *fiber.Ctx) error {
	notificationChannel := new(dto.NotificationCreateIn)
	if err := c.BodyParser(notificationChannel); err != nil {
		fmt.Print(notificationChannel)
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	errors := utils.BodyValidator.Validate(notificationChannel)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	err := queries.CreateNotificationChannel(notificationChannel)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"errors": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "Notification channel created.",
	})
}

// @Tags Notifications
// @Accept json
// @Produce json
// @Success 200 {object} dto.NotificationListOut
// @Failure 400 {object} dto.ErrorResponse
// @Router /api/notifications [get]
func ListNotificationsChannel(c *fiber.Ctx) error {
	notifications, err := queries.ListNotificationChannel()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"errors": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message":       "Notifications channels list",
		"notifications": notifications,
	})
}

// @Accept json
// @Produce json
// @Param id path string true "Notification Channel ID"
// @Success 200 {object} dto.SuccessResponse
// @Failure 400 {object} dto.ErrorResponse
// @Router /api/notifications/{id} [delete]
func DeleteNotificationChannel(c *fiber.Ctx) error {
	idParam := c.Params("id")
	if idParam == "" {
		return c.Status(400).JSON(fiber.Map{
			"message": "ID parameter is missing",
		})
	}

	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid ID parameter",
		})
	}

	err = queries.DeleteNotificationChannel(id)
	if err != nil {
		return c.JSON(fiber.Map{
			"error":   err.Error(),
			"message": "Unable to delete a notification channel",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Notifications channels deleted",
	})
}

// @Tags Notifications
// @Accept json
// @Produce json
// @Param id path string true "Notification Channel ID"
// @Param body body dto.NotificationCreateIn true "Body"
// @Success 200 {object} dto.SuccessResponse
// @Success 400 {object} dto.ErrorResponse
// @Router /api/notifications/{id} [patch]
func UpdateNotificationChannel(c *fiber.Ctx) error {
	idParam := c.Params("id")
	if idParam == "" {
		return c.Status(400).JSON(fiber.Map{
			"message": "ID parameter is missing",
		})
	}

	notificationChannel := new(dto.NotificationCreateIn)
	if err := c.BodyParser(notificationChannel); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	errors := utils.BodyValidator.Validate(notificationChannel)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid ID parameter",
		})
	}

	err = queries.UpdateNotificationById(id, notificationChannel)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Successfully updated.",
	})

}

// @Tags Notifications
// @Accept json
// @Produce json
// @Param id path string true "Notification Channel ID"
// @Success 200 {object} dto.NotificationChannelInfo
// @Success 400 {object} dto.ErrorResponse
// @Router /api/notifications/{id} [get]
func NotificationChannelInfo(c *fiber.Ctx) error {
	idParam := c.Params("id")
	if idParam == "" {
		return c.Status(400).JSON(fiber.Map{
			"message": "ID parameter is missing",
		})
	}

	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid ID parameter",
		})
	}

	notification, err := queries.FindNotificationById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message":      "success",
		"notification": notification,
	})
}
