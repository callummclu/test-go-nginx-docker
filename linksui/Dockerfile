FROM node:19-alpine as build-stage

WORKDIR /linksui

COPY /linksui/package*.json /linksui/

RUN npm install

COPY /linksui /linksui/

RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build-stage /linksui/out/ /usr/share/nginx/links
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80