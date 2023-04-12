#!/bin/bash

# Clear out any cached files and images from each individual rerun deployment
docker system prune -a -f

# gather new changes
git pull

# move env files into repo
cat ~/config/.env > webservice/.env
cat ~/config/.frontend.env > mainui/.env

# This will grab an .env file from the root directory config folder
docker-compose build --no-cache
docker-compose up -d 