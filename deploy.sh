#!/bin/bash

# Clear out any cached files and images from each individual rerun deployment
docker system prune -a -f

if ["$EUID" -ne 0] ; then
    # gather new changes
    git pull

    # move env files into repo
    cat ~/config/.env > webservice/.env
    cat ~/config/.frontend.env > mainui/.env
    cat ~/config/.frontend.env > adminui/.env
else
    echo "Local system no need to grab"
fi

# This will grab an .env file from the root directory config folder
docker-compose build --no-cache
docker-compose up -d 