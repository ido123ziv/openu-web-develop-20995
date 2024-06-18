FROM node:18-alpine as development
WORKDIR /app
COPY package*.json .
RUN npm install && npm cache clean --force
COPY src/ /app/src/
COPY public/ /app/public/
COPY index.html *config* /app/
EXPOSE 5172
CMD [ "npm", "run", "dev" ]

FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json .
RUN npm install \
    && npm cache clean --force \
    && rm -rf /tmp/*
COPY src/ /app/src/
COPY public/ /app/public/
COPY index.html *config* /app/
COPY *ts* /app/
RUN npm run build 

FROM nginx:1.27-alpine as production
COPY --from=builder /app/dist/ /var/www/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
ENTRYPOINT ["nginx","-g","daemon off;"]

