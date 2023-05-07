#!/bin/bash

docker system prune -a -f

docker-compose build --no-cache
docker-compose up -d 