# TAF (openu-web-develop-20995) 🚀
TAF is a website for babysitters and parents to meet and schedule with each other for happier parents and happier babysitters

This repo is for openu course [20995](https://www.openu.ac.il/courses/20995.htm) learning how to build web application in the cloud ☁️☁️☁️
* [how-to-run](#how-to-run)

* [tech-stack](#tech-stack)

* [prerequisites](#installation)

* [docs](./docs/)
---

# How To Run
You can run the project with a one-liner!

simply run from repo root:

```bash
docker compose -f compose-prod.yml up
```

If you want to enable the location feature you'll need to save it as a `.env` file:

Copy the value of the `LOCATION_API_KEY` sent to you and save it in a file called `.env` at the repo root (where [README](./README.md) is at)

```.env
LOCATION_API_KEY = shhhhhhh!
```

then run the python code to setup the .env:
```bash
python3 setup-env.py
```
then start the magic
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

