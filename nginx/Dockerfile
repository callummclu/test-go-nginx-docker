FROM node:latest-alpine

WORKDIR /client

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

RUN npm run build

COPY . .

# production environment
FROM nginx:stable-alpine
COPY client/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
