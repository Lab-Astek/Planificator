FROM node:10-alpine

COPY . /app
WORKDIR /app

RUN npm install

EXPOSE $PORT

CMD [ "npm", "start" ]