FROM node:alpine

WORKDIR /pis/5

COPY package*.json ./
COPY tsconfig.json ./
COPY nodemon.json ./
COPY src ./src
COPY sql ./sql
COPY .env ./
COPY config.ts ./

EXPOSE 3002

RUN ls -a
RUN npm ci
RUN npm run build
CMD ["npm", "run", "start"]