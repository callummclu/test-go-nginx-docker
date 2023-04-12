package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func getEnvByName(name string) string {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}
	return os.Getenv(name)
}

func EnvPORT() string {

	port := "8080"
	env_port := getEnvByName("PORT")

	if len(env_port) > 0 {
		port = env_port
	}

	return ":" + port
}
