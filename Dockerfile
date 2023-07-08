# Using Alpine
FROM node:lts-alpine3.17

RUN mkdir -p /usr/src/mini-quiz

WORKDIR /usr/src/mini-quiz

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8090

CMD [ "node", "app.js" ]