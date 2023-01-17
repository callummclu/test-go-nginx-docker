#!/bin/bash

# This will grab an .env file from the root directory config folder
export GO111MODULE=on
docker-compose --env-file ~/config/.env up --build -d 
cat ~/config/.env > .env
car ~/config/.frontend.env > client/src/.env