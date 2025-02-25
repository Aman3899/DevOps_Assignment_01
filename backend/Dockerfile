FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build # If you have a build step, otherwise remove this line

FROM node:18-alpine

WORKDIR /app

RUN adduser -D myuser

USER myuser

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app ./

EXPOSE 3000

CMD ["npm", "start"]