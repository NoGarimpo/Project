FROM node:alpine

WORKDIR /api

COPY package*.json ./

RUN rm -rf node_modules
RUN npm install

COPY . .

EXPOSE 8000

USER node

CMD ["npm", "start"]