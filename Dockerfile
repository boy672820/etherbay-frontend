FROM node:14.16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache openssl make gcc g++ python && \
  npm install && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python

COPY . .

RUN npm run --script build

CMD ["node", "build/index.js"]