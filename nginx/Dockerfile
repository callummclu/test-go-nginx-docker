FROM node:latest-alpine as build-stage

WORKDIR /client

COPY package*.json /client/

RUN npm install

COPY ./ /client/

RUN npm run build


# production environment
FROM nginx:stable-alpine
COPY --from=build-stage /client/build/ /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
