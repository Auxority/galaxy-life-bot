FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG CLIENT_ID
ENV CLIENT_ID=${CLIENT_ID}

ARG GUILD_ID
ENV GUILD_ID=${GUILD_ID}

ARG BOT_TOKEN
ENV BOT_TOKEN=${BOT_TOKEN}

CMD [ "npm", "start" ]