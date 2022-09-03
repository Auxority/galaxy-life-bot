FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV CLIENT_ID=${CLIENT_ID}

ENV GUILD_ID=${GUILD_ID}

ENV BOT_TOKEN=${BOT_TOKEN}

CMD [ "npm", "run", "deploy" ]