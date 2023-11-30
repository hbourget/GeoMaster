FROM maven:3-eclipse-temurin-17 as build

ENV MICRO_SERVICE_NAME=country
ENV PUBLIC_USER=public_user

WORKDIR /app
COPY "./micro_service_${MICRO_SERVICE_NAME}" "/app/${MICRO_SERVICE_NAME}/"
COPY "${PUBLIC_USER}/" "/app/${PUBLIC_USER}/"

WORKDIR "/app/${PUBLIC_USER}"
RUN mvn install -DskipTests

WORKDIR "/app/${MICRO_SERVICE_NAME}/"
RUN mvn install -DskipTests

CMD java -jar "/app/${MICRO_SERVICE_NAME}/target/service-${MICRO_SERVICE_NAME}-0.0.1-SNAPSHOT.jar"