FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install -D @types/express typescript ts-node --save
COPY index.ts tsconfig.json routes/ utils/ /app/
RUN npm run build 

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/dist/ .
COPY --from=builder /app/node_modules/ ./node_modules/
EXPOSE 3000
CMD ["node", "index.js"]

