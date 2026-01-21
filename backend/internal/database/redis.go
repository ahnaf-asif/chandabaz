package database

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/redis/go-redis/v9"
)

var RedisClient *redis.Client

func ConnectRedis() {
	host := os.Getenv("REDIS_HOST")
	if host == "" {
		host = "localhost"
	}

	port := os.Getenv("REDIS_PORT")
	if port == "" {
		port = "6379"
	}

	
	redisAddr := fmt.Sprintf("%s:%s", host, port)


	RedisClient = redis.NewClient(&redis.Options{
		Addr:     redisAddr,
		Password: "", 
		DB:       0,  
	})


	_, err := RedisClient.Ping(context.Background()).Result()
	if err != nil {
		log.Fatalf("❌ Failed to connect to Redis at %s: %v", redisAddr, err)
	}

	log.Printf("✅ Connected to Redis Successfully (%s)", redisAddr)
}