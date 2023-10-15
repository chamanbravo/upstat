package controllers

import (
	"context"

	"github.com/chamanbravo/upstat/app/models"
	"github.com/chamanbravo/upstat/platform/database"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Monitor struct {
	Name      string `json:"name" validate:"required"`
	Url       string `json:"url" validate:"required"`
	Method    string `json:"method"`
	Heartbeat string `json:"heartbeat" validate:"required"`
}

func AddMonitor(c *fiber.Ctx) error {
	monitor := new(Monitor)
	if err := c.BodyParser(monitor); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "invalid body",
		})
	}

	if err := validate.Struct(monitor); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	coll := database.GetDBCollection("monitor")
	_, err := coll.InsertOne(c.Context(), monitor)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "failed to save new monitor",
			"error":   err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "new monitor added",
	})
}

func ListMonitor(c *fiber.Ctx) error {
	var list []models.Monitor
	coll := database.GetDBCollection("monitor")
	cursor, err := coll.Find(c.Context(), bson.D{})
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	if err := cursor.All(c.Context(), &list); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	defer cursor.Close(c.Context())

	return c.JSON(fiber.Map{
		"message": "monitor list",
		"resutls": list,
	})
}

func EditMonitor(c *fiber.Ctx) error {
	id := c.Params("id")
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid ID format",
		})
	}

	data := new(models.Monitor)
	if err := c.BodyParser(data); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "invalid data",
		})
	}

	coll := database.GetDBCollection("monitor")

	filter := bson.M{"_id": objID}
	update := bson.M{"$set": bson.M{
		"name":      data.Name,
		"url":       data.Url,
		"heartbeat": data.Heartbeat,
		"method":    data.Method,
	}}

	options := options.FindOneAndUpdate().SetReturnDocument(options.After)

	var updatedDocument models.Monitor
	err = coll.FindOneAndUpdate(context.Background(), filter, update, options).Decode(&updatedDocument)
	if err == mongo.ErrNoDocuments {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Document not found",
		})
	} else if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"message": "monitor changes saved",
		"data":    updatedDocument,
	})
}
