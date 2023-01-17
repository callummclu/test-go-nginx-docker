#!/bin/bash

# This will grab an .env file from the root directory config folder
cat ~/config/.env > .env
cat ~/config/.frontend.env > client/.env

docker-compose --env-file ~/config/.env up --build -d 