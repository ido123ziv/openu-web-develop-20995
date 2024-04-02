FROM node:18
WORKDIR /app
COPY package.json ./
RUN npm install express --save
RUN npm install
COPY server/ ./server/
COPY client/ ./client/
EXPOSE 3000
CMD ["node", "server/server.js"]
