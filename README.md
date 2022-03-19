# This repository shows how you can build API with microservice architecture using nestjs
## Features of this example
This example is basically an API for ecommerce application. It provides a possibility to perform filter products based on color, name ...
## Running the example with docker-compose
Execute `docker network create infrastructure && cp .env.example .env && docker-compose up -d` from the root of the repository
## Brief architecture overview
This API showcase consists of the following parts:
- Product service - responsible for search products
- Log service - responsible for tracking user's actions, and centralize log of microservices
- The service interact via **TCP sockets**