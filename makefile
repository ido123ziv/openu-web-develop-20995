build:
	docker-compose build
up:
	export DB_PASSWORD=1234
    docker-compose up -d

clean:
    docker rmi -f $(docker images -f "dangling=true" -q)

down: 
    docker-compose down