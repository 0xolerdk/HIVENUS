# Stage 1: Build stage
FROM maven:3.8.1-openjdk-17-slim AS build

WORKDIR /app

# Predefined environment variables
ENV FCD_API_KEY=FPSzFJBUD8wUKeGA5qaFggDIlu7k4pcN9mP6qdx7
ENV FCD_API_URL=https://api.nal.usda.gov/fdc/v1/

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src

RUN mvn package -DskipTests

# Stage 2: Runtime stage
FROM openjdk:17-jdk-slim

# Set timezone environment variable
ENV TZ=Europe/Warsaw

# Predefined environment variables
ENV FCD_API_KEY=FPSzFJBUD8wUKeGA5qaFggDIlu7k4pcN9mP6qdx7
ENV FCD_API_URL=https://api.nal.usda.gov/fdc/v1/

# Copy the built jar file from the build stage
COPY --from=build /app/target/back_end-0.0.1-SNAPSHOT.jar /app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]

EXPOSE 8080
