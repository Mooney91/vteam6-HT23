FROM node:18

WORKDIR /simulation

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 1341

CMD ["node", "simulator.js"]