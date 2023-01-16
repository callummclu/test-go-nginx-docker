# production environment
FROM nginx:stable-alpine
COPY client/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
