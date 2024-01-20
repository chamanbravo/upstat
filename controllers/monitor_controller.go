package controllers

import (
	"strconv"

	"github.com/chamanbravo/upstat/queries"
	"github.com/chamanbravo/upstat/serializers"
	"github.com/chamanbravo/upstat/utils"
	"github.com/gofiber/fiber/v2"
)

// CreateMonitor method to create a new monitor.
// @Description Create a new monitor.
// @Summary create a new monitor
// @Tags Auth
// @Accept json
// @Produce json
// @Param body body serializers.AddMonitorIn true "Body"
// @Success 200 {object} serializers.SuccessResponse
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/monitor/create [post]
func CreateMonitor(c *fiber.Ctx) error {
	newMonitor := new(serializers.AddMonitorIn)
	if err := c.BodyParser(newMonitor); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "Invalid body",
			"message": err.Error(),
		})
	}

	errors := utils.BodyValidator.Validate(newMonitor)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	monitor, err := queries.CreateMonitor(newMonitor)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	utils.StartGoroutine(monitor)

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
	})
}

func MonitorInfo(c *fiber.Ctx) error {
	idParam := c.Params("id")
	if idParam == "" {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "ID parameter is missing",
		})
	}

	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "Invalid ID parameter",
		})
	}

	monitor, err := queries.FindMonitorById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
		"monitor": monitor,
	})
}

func UpdateMonitor(c *fiber.Ctx) error {
	idParam := c.Params("id")
	if idParam == "" {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "ID parameter is missing",
		})
	}

	monitor := new(serializers.AddMonitorIn)
	if err := c.BodyParser(monitor); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "Invalid body",
			"message": err.Error(),
		})
	}

	errors := utils.BodyValidator.Validate(monitor)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "Invalid ID parameter",
		})
	}

	err = queries.UpdateMonitorById(id, monitor)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
	})

}

func PauseMonitor(c *fiber.Ctx) error {
	idParam := c.Params("id")
	if idParam == "" {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "ID parameter is missing",
		})
	}

	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "Invalid ID parameter",
		})
	}

	utils.StopGoroutine(int(id))
	err = queries.UpdateMonitorStatus(id, "yellow")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
	})
}

func ResumeMonitor(c *fiber.Ctx) error {
	idParam := c.Params("id")
	if idParam == "" {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "ID parameter is missing",
		})
	}

	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "Invalid ID parameter",
		})
	}

	monitor, err := queries.FindMonitorById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	utils.StartGoroutine(monitor)
	err = queries.UpdateMonitorStatus(id, "green")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
	})
}

// MonitorsList method to retrieve list of monitors.
// @Accept json
// @Produce json
// @Success 200 {object} serializers.SuccessResponse
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/monitors/list [get]
func MonitorsList(c *fiber.Ctx) error {
	monitors, err := queries.RetrieveMonitors()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	var monitorsList []fiber.Map
	for _, v := range monitors {
		heartbeat, err := queries.RetrieveHeartbeats(v.ID, 10)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error":   "Internal server error",
				"message": err.Error(),
			})
		}
		monitorItem := fiber.Map{
			"id":        v.ID,
			"name":      v.Name,
			"url":       v.Url,
			"frequency": v.Frequency,
			"status":    v.Status,
			"heartbeat": heartbeat,
		}
		monitorsList = append(monitorsList, monitorItem)
	}

	return c.Status(200).JSON(fiber.Map{
		"message":  "success",
		"monitors": monitorsList,
	})
}

// MonitorSummary method to retrieve monitor summary.
// @Accept json
// @Produce json
// @Success 200 {object} serializers.SuccessResponse
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/monitors/:id[get]
// func MonitorSummary(c *fiber.Ctx) error {
// 	idParam := c.Params("id")
// 	if idParam == "" {
// 		return c.Status(400).JSON(fiber.Map{
// 			"error":   "Bad Request",
// 			"message": "ID parameter is missing",
// 		})
// 	}

// 	id, err := strconv.Atoi(idParam)
// 	if err != nil {
// 		return c.Status(400).JSON(fiber.Map{
// 			"error":   "Bad Request",
// 			"message": "Invalid ID parameter",
// 		})
// 	}

// 	summary, err := queries.MonitorSummary(id)
// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"error":   "Internal server error",
// 			"message": err.Error(),
// 		})
// 	}

// 	return c.Status(200).JSON(fiber.Map{"message": "success", "summary": summary})
// }

func RetrieveHeartbeat(c *fiber.Ctx) error {
	idParam := c.Params("id")
	if idParam == "" {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "ID parameter is missing",
		})
	}

	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"error":   "Bad Request",
			"message": "Invalid ID parameter",
		})
	}

	heartbeat, err := queries.RetrieveHeartbeats(id, 10)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Internal server error",
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{"message": "success", "heartbeat": heartbeat})
}
