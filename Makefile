# .PHONY: test docker-test

# test:
# 	npx codeceptjs run --steps

# docker-test:
# 	docker-compose up --build
docker-build:
    docker build -t your-image-name .

docker-run:
    docker run -it your-image-name
