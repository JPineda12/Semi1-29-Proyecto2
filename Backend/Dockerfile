FROM node:latest

COPY package*.json ./app/

WORKDIR /app

RUN npm install

COPY ./build /app


EXPOSE 3000

CMD node ./index.js