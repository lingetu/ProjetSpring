# Utiliser une image de base Node.js pour construire et servir l'application Angular
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build --prod

# Installer le serveur http-server globalement
RUN npm install -g http-server

# Définir le répertoire de travail pour le serveur
WORKDIR /app/dist/angular-qrcode-website

# Exposer le port
EXPOSE 4200

# Démarrer l'application en utilisant http-server avec CORS
CMD ["http-server", "-p", "4200", "-a", "0.0.0.0", "--cors"]
