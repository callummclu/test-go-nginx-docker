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

# production environment
FROM nginx:stable-alpine
COPY --from=mainsite /mainui/out/ /usr/share/nginx/html
COPY --from=linkssite /linksui/out/ /usr/share/nginx/links

RUN mkdir /usr/share/nginx/cdn
COPY /static/ /usr/share/nginx/cdn
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/sites/ /etc/nginx/sites
COPY nginx/errorpages /etc/nginx
EXPOSE 80