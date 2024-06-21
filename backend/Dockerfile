# Use a base image with Maven and OpenJDK installed
FROM maven:3.8.1-openjdk-17-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml file and download dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Build the application
RUN mvn package -DskipTests

# Use a new base image for the final image
FROM openjdk:17-jdk-slim

# Set the timezone
ENV TZ=Europe/Warsaw

# Copy the built JAR file from the build stage
COPY --from=build /app/target/back_end-0.0.1-SNAPSHOT.jar /app.jar

# Specify the entry point
ENTRYPOINT ["java", "-jar", "/app.jar"]

# Expose the application port
EXPOSE 8080
