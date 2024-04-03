FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install -D @types/express typescript ts-node --save
COPY server/ ./server/
RUN npm run build 

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY client/ ./client/
COPY --from=builder /app/server/dist/ ./server/
COPY --from=builder /app/node_modules/ ./node_modules/
EXPOSE 3000
CMD ["node", "server/index.js"]

