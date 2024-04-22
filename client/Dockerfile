FROM node:18-alpine as development
WORKDIR /app
COPY package*.json .
RUN npm install && npm cache clean --force
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev" ]

FROM node:18-alpine as builder
WORKDIR /app
COPY client/package.json .
RUN npm install  && npm cache clean --force
COPY . .
RUN npm run build 

FROM node:18-alpine as production
WORKDIR /app
COPY package*.json ./
COPY client/ ./client/
COPY --from=builder /app/dist/ .
COPY --from=builder /app/node_modules/ ./node_modules/
EXPOSE 8080
CMD ["npm", "run" "preview"]

