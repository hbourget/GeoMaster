FROM maven:latest

ENV MICRO_SERVICE_NAME=proxyauth
ENV PUBLIC_USER=public_user

WORKDIR /app
COPY "./micro_service_${MICRO_SERVICE_NAME}" "/app/${MICRO_SERVICE_NAME}/"
COPY "${PUBLIC_USER}/" "/app/${PUBLIC_USER}/"

WORKDIR "/app/${PUBLIC_USER}"
RUN mvn install -X -DskipTests && echo proxy

WORKDIR "/app/${MICRO_SERVICE_NAME}/"
RUN mvn install -X -DskipTests && echo proxy

CMD java -jar "/app/${MICRO_SERVICE_NAME}/target/service-${MICRO_SERVICE_NAME}-0.0.1-SNAPSHOT.jar"
