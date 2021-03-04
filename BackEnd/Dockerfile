FROM node:14.15.5-alpine

ENV PORT=9000
ENV dbUrl=mongodb://mongobookstore:27017/bookstore
ENV secretKey=thisisbookstore

WORKDIR /usr/backend

COPY package*.json /usr/backend/
COPY index.js /usr/backend

RUN npm install -g nodemon
RUN npm install



CMD ["npm", "start"]
