FROM node:18-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . /app/
EXPOSE 3000
CMD [ "npm", "run", "dev" ]

FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY index.ts tsconfig.json /app/
COPY ./routes /app/routes/
COPY ./utils /app/utils/
RUN npm run build 

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/dist/ .
COPY --from=builder /app/node_modules/ ./node_modules/
EXPOSE 3000
CMD ["node", "index.js"]

