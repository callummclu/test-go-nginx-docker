#!/bin/bash

# gather new changes
git pull

# move env files into repo
cat ~/config/.env > .env
cat ~/config/.frontend.env > client/.env

cat ~/callummclu.co.uk_ssl_certificate.cer > /etc/nginx/ssl/bundle.cer
cat ~/'_.callummclu.co.uk_private_key. (5)key' > /etc/nginx/ssl/domain_private_key.key

# This will grab an .env file from the root directory config folder
docker-compose --env-file ~/config/.env up --build -d 