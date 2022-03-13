FROM node:16.14-alpine
RUN npm install -g npm@8.1.2
RUN mkdir -p /var/www/log-service
WORKDIR /var/www/log-service
ADD . /var/www/log-service
RUN npm install
CMD npm run build && npm run start:prod
