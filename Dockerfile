FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run db:create \
npm run db:seed \
npm run build

EXPOSE 5000

CMD ["npm", "start"]
