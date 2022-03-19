FROM node:16.14-alpine
RUN npm install -g npm@8.1.2
RUN mkdir -p /var/www/product-service
WORKDIR /var/www/product-service
ADD . /var/www/product-service
RUN npm install
CMD npm run build && npm run start:prod
