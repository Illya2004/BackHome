FROM openjdk:21-jdk

WORKDIR /app

COPY target/BackHome-0.0.1-SNAPSHOT.jar /app

RUN chmod 777 BackHome-0.0.1-SNAPSHOT.jar

EXPOSE 8080

# Start the Spring Boot application
CMD ["java", "-jar", "BackHome-0.0.1-SNAPSHOT.jar"]