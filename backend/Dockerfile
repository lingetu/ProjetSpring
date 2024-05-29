# Dockerfile pour Spring Boot

# Utiliser une image de base Java
FROM openjdk:17-jdk-slim

# Définir le répertoire de travail
WORKDIR /app

# Créer un répertoire pour les logs
RUN mkdir -p /app/logs

# Ajouter le jar de l'application
COPY target/Agenda-0.0.1-SNAPSHOT.jar app.jar

# Exposer le port
EXPOSE 8080

# Démarrer l'application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
