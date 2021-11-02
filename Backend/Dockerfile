FROM node:latest

COPY package*.json ./app/

WORKDIR /app

RUN npm install

COPY ./build /app


EXPOSE 443

CMD node ./index.js