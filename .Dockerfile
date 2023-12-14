FROM node:20.10.0-alpine3.19
WORKDIR /home/challenge

COPY package.json .
COPY package-lock.json .
RUN npm install --production

RUN npm install typescript --save-dev

COPY tsconfig.json .
COPY src src

COPY .env .

RUN npm run build

EXPOSE 3000
CMD npm run start