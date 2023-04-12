FROM node:19-alpine as main
WORKDIR /mainui
COPY /mainui/package*.json /mainui/
RUN npm install
COPY /mainui /mainui/
RUN npm run build

FROM node:19-alpine as links
WORKDIR /linksui
COPY /linksui/package*.json /linksui/
RUN npm install
COPY /linksui /linksui/
RUN npm run build

FROM node:19-alpine as static
COPY /static /static

FROM nginx:stable-alpine
RUN mkdir /usr/share/nginx/cdn
COPY --from=main ./out/ /usr/share/nginx/html
COPY --from=links ./out/ /usr/share/nginx/links
COPY --from=static . /usr/share/nginx/cdn
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/sites/ /etc/nginx/sites
EXPOSE 80