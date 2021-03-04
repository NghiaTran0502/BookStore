FROM node:14.15.5-alpine


WORKDIR /usr/frontend/admin

COPY package*.json /usr/frontend/admin/

RUN npm install

EXPOSE 5000

CMD ["npm", "start"]