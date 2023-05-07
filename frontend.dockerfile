FROM node:19-alpine as mainsite

WORKDIR /mainui

COPY /mainui/package*.json /mainui/

RUN npm install

COPY /mainui /mainui/

COPY /static /static

RUN npm run build

FROM node:19-alpine as linkssite

WORKDIR /linksui

COPY /linksui/package*.json /linksui/

RUN npm install

COPY /linksui /linksui/

RUN npm run build

FROM node:19-alpine as adminsite

WORKDIR /adminui

COPY /adminui/package*.json /adminui/

RUN npm install

COPY /adminui /adminui/

RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=mainsite /mainui/out/ /usr/share/nginx/html
COPY --from=linkssite /linksui/out/ /usr/share/nginx/links
COPY --from=adminsite /adminui/out/ /usr/share/nginx/admin

RUN mkdir /usr/share/nginx/cdn
COPY /static/ /usr/share/nginx/cdn
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/sites/ /etc/nginx/sites
EXPOSE 80