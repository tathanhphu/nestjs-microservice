FROM node:16.14-alpine
RUN npm install -g npm@8.1.2
RUN mkdir -p /var/www/listing-service
WORKDIR /var/www/listing-service
ADD . /var/www/listing-service
RUN npm install
CMD npm run build && npm run start:prod
