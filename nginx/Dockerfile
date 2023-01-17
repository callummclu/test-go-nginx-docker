FROM node:19-alpine as build-stage

WORKDIR /client

COPY /client/package*.json /client/

RUN npm install

COPY /client /client/

COPY callummclu.co.uk_ssl_certificate.cer /usr/share/nginx/callummclu.co.uk_ssl_certificate.cer

COPY domain_private_key.key /usr/share/nginx/domain_private_key.key

RUN npm run build


# production environment
FROM nginx:stable-alpine
COPY --from=build-stage /client/build/ /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
