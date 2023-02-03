FROM node:19-alpine as build-stage

WORKDIR /client

COPY /client/package*.json /client/

RUN npm install

COPY /client /client/

COPY /cdn /cdn

RUN npm run build


# production environment
FROM nginx:stable-alpine
COPY --from=build-stage /client/out/ /usr/share/nginx/html
RUN mkdir /usr/share/nginx/cdn
COPY /cdn/ /usr/share/nginx/cdn
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
