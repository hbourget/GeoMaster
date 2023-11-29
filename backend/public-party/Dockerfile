FROM maven:3-eclipse-temurin-17 as build
WORKDIR /app
COPY . .
RUN mvn install -DskipTests