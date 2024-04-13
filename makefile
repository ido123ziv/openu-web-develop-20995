build:
	docker-compose build

refresh:
	export DB_PASSWORD=1234
	docker-compose build
	docker-compose up -d
up:
	export DB_PASSWORD=1234
	docker-compose up -d

clean:
	docker rmi $(docker images -f "dangling=true" -q) || echo "all good"

down: 
	docker-compose down