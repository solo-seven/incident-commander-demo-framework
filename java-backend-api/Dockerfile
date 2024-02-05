# Use the official OpenJDK base image
FROM eclipse-temurin:latest as build

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle executable to the container
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Copy the project source
COPY src src

# Build the application
RUN ./gradlew build -x test

# Run the application
FROM eclipse-temurin:latest
WORKDIR /app
COPY --from=build /app/build/libs/monolith-0.0.1-SNAPSHOT.jar app.jar
ENV OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
ENV OTEL_EXPORTER_OTLP_ENDPOINT="http://grafana-k8s-monitoring-grafana-agent:4317"
ENV OTEL_SERVICE_NAME=java-backend-api
ENV OTEL_RESOURCE_ATTRIBUTES="deployment.environment=development,service.namespace=distibuted-systems-demo,service.version=1.0.0"
ENV OTEL_LOGS_EXPORTER=none
ENV OTEL_METRICS_EXPORTER=none

ADD https://github.com/grafana/grafana-opentelemetry-java/releases/latest/download/grafana-opentelemetry-java.jar /app/grafana-opentelemetry-java.jar


ENTRYPOINT ["java", "-javaagent:/app/grafana-opentelemetry-java.jar","-jar","app.jar"]


