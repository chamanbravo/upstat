package controllers

import (
	"strconv"
	"time"

	"github.com/chamanbravo/upstat/queries"
	"github.com/chamanbravo/upstat/serializers"
	"github.com/chamanbravo/upstat/utils"
	"github.com/gofiber/fiber/v2"
)

// @Tags Monitors
// @Accept json
// @Produce json
// @Param body body serializers.AddMonitorIn true "Body"
// @Success 200 {object} serializers.SuccessResponse
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/monitors/create [post]
func CreateMonitor(c *fiber.Ctx) error {
	newMonitor := new(serializers.AddMonitorIn)
	if err := c.BodyParser(newMonitor); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
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
			"message": err.Error(),
		})
	}

	utils.StartGoroutine(monitor)

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
	})
}

// @Tags Monitors
// @Accept json
// @Produce json
// @Param id path string true "Monitor ID"
// @Success 200 {object} serializers.MonitorInfoOut
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/monitors/info/{id} [get]
func MonitorInfo(c *fiber.Ctx) error {
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

	monitor, err := queries.FindMonitorById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
		"monitor": monitor,
	})
}

// @Tags Monitors
// @Accept json
// @Produce json
// @Param id path string true "Monitor ID"
// @Param body body serializers.AddMonitorIn true "Body"
// @Success 200 {object} serializers.SuccessResponse
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/monitors/update/{id} [put]
func UpdateMonitor(c *fiber.Ctx) error {
	idParam := c.Params("id")
	if idParam == "" {
		return c.Status(400).JSON(fiber.Map{
			"message": "ID parameter is missing",
		})
	}

	monitor := new(serializers.AddMonitorIn)
	if err := c.BodyParser(monitor); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
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
			"message": "Invalid ID parameter",
		})
	}

	err = queries.UpdateMonitorById(id, monitor)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
	})

}

// @Tags Monitors
// @Accept json
// @Produce json
// @Param id path string true "Monitor ID"
// @Success 200 {object} serializers.SuccessResponse
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/monitors/pause/{id} [put]
func PauseMonitor(c *fiber.Ctx) error {
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

	utils.StopGoroutine(int(id))
	err = queries.UpdateMonitorStatus(id, "yellow")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
	})
}

// @Tags Monitors
// @Accept json
// @Produce json
// @Param id path string true "Monitor ID"
// @Success 200 {object} serializers.SuccessResponse
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/monitors/resume/{id} [put]
func ResumeMonitor(c *fiber.Ctx) error {
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

	monitor, err := queries.FindMonitorById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	utils.StartGoroutine(monitor)
	err = queries.UpdateMonitorStatus(id, "green")
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
	})
}

// @Accept json
// @Produce json
// @Success 200 {object} serializers.MonitorsListOut
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/monitors/list [get]
func MonitorsList(c *fiber.Ctx) error {
	monitors, err := queries.RetrieveMonitors()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	var monitorsList []fiber.Map
	for _, v := range monitors {
		heartbeat, err := queries.RetrieveHeartbeats(v.ID, 10)
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
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

// @Tags Monitors
// @Accept json
// @Produce json
// @Param id path string true "Monitor ID"
// @Param startTime query time.Time true "Start Time" format(json)
// @Success 200 {object} serializers.HeartbeatsOut
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/monitors/heartbeat/{id} [get]
func RetrieveHeartbeat(c *fiber.Ctx) error {
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

	query := new(serializers.RetrieveHeartbeatIn)
	if err := c.QueryParser(query); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	errors := utils.BodyValidator.Validate(query)
	if len(errors) > 0 {
		return c.Status(400).JSON(errors)
	}

	heartbeat, err := queries.RetrieveHeartbeatsByTime(id, query.StartTime)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{"message": "success", "heartbeat": heartbeat})
}

// @Tags Monitors
// @Accept json
// @Produce json
// @Param id path string true "Monitor ID"
// @Success 200 {object} serializers.MonitorSummary
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/monitors/summary/{id} [get]
func MonitorSummary(c *fiber.Ctx) error {
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

	averageLatency, err := queries.RetrieveAverageLatency(id, time.Now().Add(-time.Hour*24))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	dayUptime, err := queries.RetrieveUptime(id, time.Now().Add(-time.Hour*24))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	monthUptime, err := queries.RetrieveUptime(id, time.Now().Add(-time.Hour*30*24))
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{
		"message": "success",
		"summary": &serializers.MonitorSummary{
			AverageLatency: averageLatency,
			DayUptime:      dayUptime,
			MonthUptime:    monthUptime,
		},
	})
}

// @Tags Monitors
// @Accept json
// @Produce json
// @Param id path string true "Monitor ID"
// @Success 200 {object} serializers.SuccessResponse
// @Success 400 {object} serializers.ErrorResponse
// @Router /api/monitors/delete/{id} [delete]
func DeleteMonitor(c *fiber.Ctx) error {
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

	utils.StopGoroutine(id)
	err = queries.DeleteMonitorById(id)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.Status(200).JSON(fiber.Map{"message": "success"})
}
