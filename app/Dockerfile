FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm i
RUN npm i --prefix=./server/src
RUN npm i --prefix=./client
EXPOSE ${PORT}
CMD ["npm", "run", "build-and-start"]