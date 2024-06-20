FROM openjdk:17-jdk-slim

ENV TZ=Europe/Warsaw

COPY target/back_end-0.0.1-SNAPSHOT.jar /app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]

EXPOSE 8080
