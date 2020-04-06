FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY ./src .

CMD [ "node", "index.js" ]