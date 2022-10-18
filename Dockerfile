FROM node:16

WORKDIR /app

COPY . /app

WORKDIR /app/client

RUN npm install

RUN npm run build

WORKDIR /app/server

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]