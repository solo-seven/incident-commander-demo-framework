.PHONY: clean
clean:
	kind delete cluster

.PHONY: build
build: build-frontend build-java-backend

.PHONY: build-frontend
build-frontend:
	docker build -t solo-seven/frontend-demo ./frontend-static-demo

.PHONY: build-java-backend
build-java-backend:
	docker build -t solo-seven/java-backend-api ./java-backend-api

.PHONY: create
create:
	kind create cluster --config ./config/distributed-systems-kind-cluster.yaml

.PHONY: load
load:
	kind load docker-image solo-seven/frontend-demo:latest
	kind load docker-image solo-seven/java-backend-api:latest
	# kind load docker-image solo-seven/golang-backend-microservice:latest

.PHONY: helm
helm:
	helm repo update
	helm upgrade --install --atomic --timeout 120s cert-manager jetstack/cert-manager --set installCRDs=true
	helm upgrade --install --atomic --timeout 120s grafana-k8s-monitoring grafana/k8s-monitoring \
		--namespace default \
		--values ./config/grafana-values.yaml \
		--set externalServices.prometheus.basicAuth.password="${GCMPW}" \
		--set externalServices.loki.basicAuth.password="${GCLPW}" \
		--set externalServices.tempo.basicAuth.password="${GCTPW}"

.PHONY: start
start: build create load helm

.PHONY: run
run: build load
	kubectl apply -k ./deploy

.PHONY: clean-docker
clean-docker: clean-docker-agent clean-docker-frontend clean-docker-backend

.PHONY: clean-docker-frontend
clean-docker-frontend:
	- docker stop frontend
	- docker rm frontend

.PHONY: run-docker-frontend
run-docker-frontend: clean-docker build
	docker run -d --net=host --name frontend solo-seven/frontend-demo

.PHONY: clean-docker-backend
clean-docker-backend:
	- docker stop backend
	- docker rm backend

.PHONY: run-docker-backend
run-docker-backend: clean-docker build
	docker run -d --net=host --name backend solo-seven/java-backend-api

.PHONY: clean-docker-agent
clean-docker-agent:
	- docker stop grafana-agent
	- docker rm grafana-agent

.PHONY: run-docker-agent
run-docker-agent: clean-docker
	docker run -d \
		--net=host \
		--name grafana-agent \
		-e AGENT_MODE=flow \
		-e GRAFANA_CLOUD_TOKEN="${GC_API_KEY}" \
		-v ./config/config.river:/etc/agent/config.river \
		grafana/agent:main \
			run --server.http.listen-addr=0.0.0.0:12347 /etc/agent/config.river

.PHONY: run-docker
run-docker: run-docker-agent run-docker-backend run-docker-frontend

.PHONY: clean-local-frontend
clean-local-frontend:
	cd frontend-static-demo && npm run clean

.PHONY: clean-local-backend
clean-local-backend:
	cd java-backend-api && ./gradlew clean

.PHONY: clean-local
clean-local: clean-local-frontend clean-local-backend
	rm -rf build

.PHONY: build-local-frontend
build-local-frontend:
	cd frontend-static-demo && npm run build

.PHONY: build-local-backend
build-local-backend:
	cd java-backend-api && ./gradlew bootJar

.PHONY: build-local
build-local: build-local-frontend build-local-backend

.PHONY: run-local-frontend
run-local-frontend: build-local-frontend
	cd frontend-static-demo && npm run serve

.PHONY: java-instrumentation
java-instrumentation:
	@if [ ! -d "build/java-instrumentation" ]; then \
    	echo "Directory build/java-instrumentation not found. Creating..."; \
		mkdir -p build/java-instrumentation ; \
		wget https://github.com/grafana/grafana-opentelemetry-java/releases/latest/download/grafana-opentelemetry-java.jar -o build/java-instrumentation/grafana-opentelemetry-agent.jar ; \
    fi

.PHONY: stop-grafana-agent
stop-grafana-agent:
	@if [ -f 'build/grafana-agent/grafana-agent.pid' ]; then \
		kill `cat build/grafana-agent/grafana-agent.pid` && rm -f build/grafana-agent/grafana-agent.pid ; \
	fi

.PHONY: start-grafana-agent
start-grafana-agent: stop-grafana-agent
	@if [ ! -d 'build/grafana-agent' ]; then \
  		mkdir -p build/grafana-agent ; \
  		grafana-agent --server.http.address 127.0.0.1:12347 --server.grpc.address 127.0.0.1:12348 --config.file config/grafana-agent.yaml > build/grafana-agent/agent.log & ; \
  		echo $$! > build/grafana-agent/grafana-agent.pid ; \
	fi

.PHONY: run-local-backend
run-local-backend: java-instrumentation start-grafana-agent
	@if [ ! -d 'java-backened-api/build/run' ]; then \
		mkdir -p java-backend-api/build/run ; \
	fi
	java -javaagent:./build/java-instrumentation/grafana-opentelemetry-java.jar -jar ./java-backend-api/build/libs/monolith-0.0.1-SNAPSHOT.jar > ./build/run/app.log &
	echo $$! > java-backend-api/build/run/monolith.pid

.PHONY: stop-local-backend
stop-local-backend:
	@if [ -f 'java-backend-api/build/run/monolith.pid' ]; then \
		kill `cat java-backend-api/build/run/monolith.pid` && rm -f java-backend-api/build/run/monolith.pid ; \
	fi

.PHONY: run-local
run-local: run-local-backend run-local-frontend

.PHONY: clean-all
clean-all: clean clean-docker clean-local