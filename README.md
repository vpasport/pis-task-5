```bash
cp ./config.ts.example ./config.ts
docker compose build

# start
docker compose up

# stop
docker compose down
```

Project start on port 3002

Open [http://localhost:3002/](http://localhost:3002/) with your browser to see the result.


SWARM:
```bash
docker build -t pis-task-9 .
docker image tag pis-task-9 vpasport/pis-task-9:latest 
docker push vpsaport/pis-task-9:latest

docker swarm init

# start service
docker stack deploy -c docker-compose.yml pis-task-9
# logs
docker service logs -f pis-task-9_node

# kill
docker stack rm pis-task-9
docker swarm leave --force
```