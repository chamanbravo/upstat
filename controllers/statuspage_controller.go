package controllers

import (
	"strconv"

	"github.com/chamanbravo/upstat/queries"
	"github.com/chamanbravo/upstat/serializers"
	"github.com/chamanbravo/upstat/utils"
	"github.com/gofiber/fiber/v2"
)

// @Tags StatusPages
// @Accept json
// @Produce json
// @Param body body serializers.CreateStatusPageIn true "Body"
// @Success 200 {object} serializers.SuccessResponse
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/status-pages/create [post]
func CreateStatusPage(c *fiber.Ctx) error {
	statusPage := new(serializers.CreateStatusPageIn)
	if err := c.BodyParser(statusPage); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	errors := utils.BodyValidator.Validate(statusPage)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	err := queries.CreateStatusPage(statusPage)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}

// @Tags StatusPages
// @Accept json
// @Produce json
// @Success 200 {object} serializers.ListStatusPagesOut
// @Failure 400 {object} serializers.ErrorResponse
// @Router /api/status-pages/list [get]
func ListStatusPages(c *fiber.Ctx) error {
	statusPages, err := queries.ListStatusPages()
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"errors": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message":     "Status pages list",
		"statusPages": statusPages,
	})
}

// @Accept json
// @Produce json
// @Param id path string true "Status Page ID"
// @Success 200 {object} serializers.SuccessResponse
// @Failure 400 {object} serializers.ErrorResponse
// @Router /api/status-pages/delete/{id} [delete]
func DeleteStatusPage(c *fiber.Ctx) error {
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

	err = queries.DeleteStatusPageById(id)
	if err != nil {
		return c.JSON(fiber.Map{
			"error":   err.Error(),
			"message": "Unable to delete a status page",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Status Page channels deleted",
	})
}

// @Tags Notifications
// @Accept json
// @Produce json
// @Param id path string true "Status Page ID"
// @Param body body serializers.CreateStatusPageIn true "Body"
// @Success 200 {object} serializers.SuccessResponse
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/status-pages/update/{id} [put]
func UpdateStatusPage(c *fiber.Ctx) error {
	idParam := c.Params("id")
	if idParam == "" {
		return c.Status(400).JSON(fiber.Map{
			"message": "ID parameter is missing",
		})
	}

	statusPage := new(serializers.CreateStatusPageIn)
	if err := c.BodyParser(statusPage); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	errors := utils.BodyValidator.Validate(statusPage)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid ID parameter",
		})
	}

	err = queries.UpdateStatusPage(id, statusPage)
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
// @Param id path string true "Status Page ID"
// @Success 200 {object} serializers.StatusPageInfo
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/status-pages/info/{id} [get]
func StatusPageInfo(c *fiber.Ctx) error {
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

	statusPage, err := queries.FindStatusPageById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message":    "success",
		"statusPage": statusPage,
	})
}
