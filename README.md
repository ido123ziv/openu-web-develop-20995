# (Temp Name) openu-web-develop-20995 🚀
This repo is for openu course [20995](https://www.openu.ac.il/courses/20995.htm) learning how to build web application in the cloud ☁️☁️☁️

# How To Run
```bash
export DB_PASSWORD=1234
docker-compose up
```
---
**IF YOU HAVE WINDOWS LOOK HERE!**
```powershell
$Env:DB_PASSWORD=1234
docker-compose up
```
--- 
or you can use:
```
make up
```
---
__IF YOU USE PGAdmin Please Refer to [docs](./docs/pgadmin.md)__
---
# Tech Stack
* Backend -> [nodejs](https://nodejs.org/en)

* Frontend -> [reactJS](https://react.dev/)

* Database -> [postgresql](https://www.postgresql.org/)

* Orchestration -> [Docker-compose](https://docs.docker.com/compose/)

* Continuos Integration -> [GitHub Actions](https://github.com/features/actions)


# Installation
## Tech Stack Installation Links
`NodeJS` -> [here](https://nodejs.org/en/download)

`ReactJS` -> [You Need to install node silly](https://react.dev/learn/add-react-to-an-existing-project)

`Postgresql` -> [here](https://www.postgresql.org/download/)

`Docker` -> [not here](https://docs.docker.com/get-docker/)

## Linter
We use [eslint](https://eslint.org/) which is really good and easy to use :rocket:

For installation run:
```bash
npm install eslint --save-dev
```

And then run:
```bash
npx eslint .
```

## Pre Commit
> Git hook scripts are useful for identifying simple issues before submission to code review. We run our hooks on every commit to automatically point out issues in code such as missing semicolons, trailing whitespace, and debug statements. By pointing these issues out before code review, this allows a code reviewer to focus on the architecture of a change while not wasting time with trivial style nitpicks. [read-more](https://pre-commit.com/#install)

### Installation
Mac/Linux:
```bash
pip install pre-commit
pre-commit --version
pre-commit install
```


### Manual Run
```bash
pre-commit run --all-files
```


## Project
From the repo root run:
```bash
npm install
```
To work locally, if you get errors try:
```bash
 npm install express --save
```
With Docker:
```bash
docker compose up
```

If the images are missing it will build them before, for building run:

```bash
docker compose build
```

# Docs
TBD

# Links
TBD

