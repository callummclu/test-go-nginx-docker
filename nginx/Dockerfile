FROM nginx:latest
EXPOSE 80
COPY nginx/nginx.conf /etc/nginx/nginx.conf

FROM node:latest
RUN cd client && npm run build && cd ..
COPY client/public/index.html /var/www/html
COPY client/public/static /var/www/html/public

