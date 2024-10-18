# Docker Commands

## Init Docker Compose environment

```
docker-compose up --build
```

## Stop Docker Compose environment

With this command we stop docker compose and stopping and deleting the volumes.

```
docker-compose down -v
```

## Simple Commands

### List all docker images
```
docker image ls
```
### Delete all the images
```
docker rmi $(docker images -q)
```

### List all docker containers
```
docker container ls
```

or to list all the containers (stopped or not)
```
docker ps -a
```

### Stop a container
```
docker start/stop <container_name>/<container_id> 
```
### Delete containers
```
docker rm $(docker ps -a)
```