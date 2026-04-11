FROM node:25-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

ENV PORT 3000

EXPOSE ${PORT}