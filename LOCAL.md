# Chuck Norris joke backend application

This application uses PostgreSQL database run in Docker.

---

[Go Back to Main README - Table of contents](./README.md#table-of-contents)

## Prerequisites

You will need a docker installed on your system to manage all the containers we will setup.
While setting up your Docker, please make sure you give it enough memory for running the required applications. (At least 6gb)

## Setting up everything

---

### Docker

A `docker desktop` app can be downoaded for easier downloading and running of docker images. Download the PostgreSQL image with the command:

```shell
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```

which will run the image automatically.

All the containers can be listed with the command:

```shell
docker ps
```

which will give you a table view of all the containers currenty running:

```shell
CONTAINER ID   IMAGE      COMMAND                  CREATED        STATUS          PORTS                    NAMES
78d746e65565   postgres   "docker-entrypoint.s…"   2 months ago   Up 11 seconds   0.0.0.0:5432->5432/tcp   postgres
```
