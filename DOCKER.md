# pbl-frontend Docker
(Use the commands in the project root-folder / location of "Dockerfile")

## Docker setup
See [Docker - Getting Started](https://docs.docker.com/get-started/)

### Build Docker-Image
```
docker build . -t frontend
```

### First time build and run container
```
docker run --name frontend -d -p 8080:80 frontend
```

### Start or stop container after first run
```
docker start frontend
docker stop frontend
```

