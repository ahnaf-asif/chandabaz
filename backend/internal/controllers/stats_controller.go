package controllers

import (
	"github.com/ahnaf-asif/chandabaz/internal/services"
	"github.com/gofiber/fiber/v2"
)


func GetDashboardStats(c *fiber.Ctx) error {
	
	stats, err := services.GetDashboardStats(c.UserContext())
	
	if err != nil {
		return c.JSON(fiber.Map{
			"data": services.DashboardStats{},
			"error": "Could not load real-time stats",
		})
	}

	return c.JSON(fiber.Map{
		"data": stats,
	})
}