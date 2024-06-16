FROM node:18-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
RUN npm install -g nodemon
COPY *ts* /app/
COPY routes/ /app/routes/
COPY utils/ /app/utils/
EXPOSE 3000
CMD [ "npm", "run", "dev" ]

FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY index.ts tsconfig.json /app/
COPY *ts* /app/
COPY ./routes /app/routes/
COPY ./utils /app/utils/
COPY ./middlewares /app/middlewares/
RUN npm run build 

FROM node:18-alpine as production
WORKDIR /app
COPY package*.json ./
COPY --from=builder /app/dist/ .
COPY --from=builder /app/node_modules/ ./node_modules/
EXPOSE 3000
CMD ["node", "index.js"]

