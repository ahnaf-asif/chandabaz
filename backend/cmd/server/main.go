package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"

	"github.com/ahnaf-asif/chandabaz/internal/controllers"
	"github.com/ahnaf-asif/chandabaz/internal/database"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️  No .env file found, using system variables")
	}

	database.ConnectDB()
	database.ConnectRedis()

	app := fiber.New()

	app.Use(logger.New())
	app.Use(cors.New())

	app.Get("/api/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"status":  "success",
			"message": "Hybrid Setup is working!",
		})
	})

	api := app.Group("/api")
	api.Post("/reports", controllers.CreateReport)

	api.Get("/stats/dashboard", controllers.GetDashboardStats)

	log.Fatal(app.Listen(":8080"))
}
