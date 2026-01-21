package controllers

import (
	"context"

	"github.com/ahnaf-asif/chandabaz/internal/database"
	"github.com/ahnaf-asif/chandabaz/internal/models"
	"github.com/ahnaf-asif/chandabaz/internal/services"

	"github.com/gofiber/fiber/v2"
)

func CreateReport(c *fiber.Ctx) error {
    var input models.Report

    if err := c.BodyParser(&input); err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
            "error": "Invalid form data: " + err.Error(),
        })
    }

    if result := database.DB.Create(&input); result.Error != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
            "error": "Failed to save report",
        })
    }

    go services.UpdateReportStats(context.Background(), &input)


    return c.Status(fiber.StatusCreated).JSON(fiber.Map{
        "message": "Report submitted successfully",
        "data":    input,
    })
}