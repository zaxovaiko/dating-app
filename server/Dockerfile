FROM node:16 AS builder

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build


FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD ["npm", "run", "start:prod"]