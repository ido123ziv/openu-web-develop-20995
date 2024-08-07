# TAF (openu-web-develop-20995) 🚀
TAF is a website for babysitters and parents to meet and schedule with each other for happier parents and happier babysitters. 

This [repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/about-repositories) is for openu course [20995](https://www.openu.ac.il/courses/20995.htm) learning how to build web application in the cloud ☁️☁️☁️
* [repo](https://github.com/ido123ziv/openu-web-develop-20995)
  
* [how-to-run](#how-to-run)

* [tech-stack](#tech-stack)

* [prerequisites](#installation)

* [docs](./docs/)
---

# How To Run

**Important**
You must have `docker` installed in order to run the project!!!!!

If you don't have *docker* installed or any other container management cli tool please refer to [installation](#installation)

---

For local development we use a `.env` file (which holds the api keys used), copy the file sent to you (attached to drive) to the repo root and then start the magic

simply run from repository root:

```bash
docker compose -f compose-prod.yml up
```

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

