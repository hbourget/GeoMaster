FROM maven:3-eclipse-temurin-17 as build

# ENV MICRO_SERVICE_NAME=service_card

# WORKDIR /app
# COPY "./micro_${MICRO_SERVICE_NAME}" "./micro_${MICRO_SERVICE_NAME}"
# RUN chmod +x script.sh
# ENTRYPOINT [ "/bin/sh","/script.sh" ]

# # ! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

ENV PUBLIC_COUNTRY=public_country
ENV PUBLIC_INVENTORY=public_inventory
ENV PUBLIC_USER=public_user

WORKDIR /app
COPY "sonar_tests/script.sh" "/app/script.sh"
COPY "./micro_service_card" "/app/service_card/"
COPY "./micro_service_inventory" "/app/service_inventory/"

COPY "${PUBLIC_COUNTRY}/" "/app/${PUBLIC_COUNTRY}/"
COPY "${PUBLIC_INVENTORY}/" "/app/${PUBLIC_INVENTORY}/"
COPY "${PUBLIC_USER}/" "/app/${PUBLIC_USER}/"

WORKDIR "/app/${PUBLIC_COUNTRY}"
RUN mvn install -DskipTests

WORKDIR "/app/${PUBLIC_INVENTORY}"
RUN mvn install -DskipTests

WORKDIR "/app/${PUBLIC_USER}"
RUN mvn install -DskipTests

WORKDIR /app

ENTRYPOINT [ "/bin/sh" ,"script.sh" ]
