FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV PORT 3000

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]