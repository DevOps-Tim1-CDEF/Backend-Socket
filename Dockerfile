FROM node:20-alpine3.18

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install
EXPOSE 2500
CMD ["npm", "run", "dev"]
