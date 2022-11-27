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
docker swarm init
docker service create --name registry --publish published=5000,target=5000 registry:2

docker service ls

docker compose push 
```