# Docker
We use docker in order to run the project locally and share all configurations across different OS's and versions. (Mac, win10,win11, ubuntu22.04)

## Build
In order to build the entire project you can use compose:
```bash
docker compose build
```
Also can build each container by itself:

* backend: `docker build -t backend -f server/Dockerfile server/`

* frontend: `docker build -t frontend -f client/Dockerfile client/`

* db: `docker build -t db -f server/utils/db/Dockerfile server/utils/db/`

## Run
Compose:
```bash
docker compose up 
```
or just one at a time:
```bash
docker run \
    -d \
    --name backend \
    -p 3001:3000 \
    openu-web-develop-20995-api
```

## Tagging
You can re-tag an image for saving it for special cases:
```bash
docker tag old-tag new-tag
```

## Working with container registry
We are uploading the images to github packages so we can pull whenever we need
```bash
docker pull ghcr.io/ido123ziv/openu-web-develop-20995-api
```

## Debugging
Errors such as:
> db-1   |
db-1   | PostgreSQL Database directory appears to contain a database; Skipping initialization
db-1   |
db-1   | 2024-04-22 14:00:53.641 UTC [1] FATAL:  database files are incompatible with server
db-1   | 2024-04-22 14:00:53.641 UTC [1] DETAIL:  The data directory was initialized by PostgreSQL version 16, which is not compatible with this version 14.11 (Debian 14.11-1.pgdg120+2).
db-1 exited with code 1


are fixed by running:
```bash
docker volume rm openu-web-develop-20995_db
docker compose up
```