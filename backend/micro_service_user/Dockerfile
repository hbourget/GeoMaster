FROM maven:3-eclipse-temurin-17 as build

ENV MICRO_SERVICE_NAME=user
ENV PUBLIC_CARD=public_card
ENV PUBLIC_INVENTORY=public_inventory

WORKDIR /app

COPY "./micro_service_${MICRO_SERVICE_NAME}" "/app/${MICRO_SERVICE_NAME}/"

WORKDIR "/app/${MICRO_SERVICE_NAME}/"
RUN mvn install -DskipTests

CMD java -jar "/app/${MICRO_SERVICE_NAME}/target/service-${MICRO_SERVICE_NAME}-0.0.1-SNAPSHOT.jar"