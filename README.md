# TAF (openu-web-develop-20995) 🚀
TAF is a website for babysitters and parents to meet and schedule with each other for happier parents and happier babysitters

This repo is for openu course [20995](https://www.openu.ac.il/courses/20995.htm) learning how to build web application in the cloud ☁️☁️☁️
* [how-to-run](#how-to-run)

* [tech-stack](#tech-stack)

* [prerequisites](#installation)

* [docs](./docs/)

* [local-dev](#project)

* [automated-tests](#testing)

and some important tools we are working with [linter](#linter) & [pre-commit](#pre-commit)

---

# How To Run
First of all copy the value of the `LOCATION_API_KEY` sent to you and save it in a file called `.env` at the repo root (where [README](./README.md) is at)

```.env
LOCATION_API_KEY = shhhhhhh!
```
then run the python code to setup the .env:
```bash
python3 setup-env.py
```
then start the magic
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

# Testing
We use [Puppeteer](https://pptr.dev/) for frontend testing and [Node-Fetch](https://www.npmjs.com/package/node-fetch) for backend testing.

You can see the test suite in [tests](./test/)

* `api-test.js` -> testing the api for simple calls and validation

* `browser-test.js` -> testing all front public pages

*  `login-test.js` -> signup and loging for both parent and babysitter

if you add:
```bash
export TEST_NON_EXISTS=1
```
before running [api-test.js](./test/api-test.js) it will test non existing users as well

all test running in github action after a pr is created following by a linter check.