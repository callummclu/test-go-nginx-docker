#!/bin/bash

# gather new changes
git pull

# move env files into repo
cat ~/config/.env > .env
cat ~/config/.frontend.env > mainui/.env

# This will grab an .env file from the root directory config folder
docker-compose build --no-cache
docker-compose up -d 