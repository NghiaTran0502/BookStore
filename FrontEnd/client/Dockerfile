FROM node:14.15.5-alpine


WORKDIR /usr/frontend/client

COPY package*.json /usr/frontend/client/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]