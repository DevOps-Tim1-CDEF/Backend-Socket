FROM node:20-alpine3.18 AS build

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install
RUN npm install pm2 -g

EXPOSE 2500

CMD ["pm2-runtime", "app.js"]
