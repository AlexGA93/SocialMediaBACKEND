# Usa la imagen de Node.js
FROM node:20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto de la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:prod"]
