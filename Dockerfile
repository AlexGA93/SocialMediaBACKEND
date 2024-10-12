# Usa la imagen de Node.js
FROM node:18

RUN mkdir -p /home/app

# Establece el directorio de trabajo
WORKDIR /home/app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto de la aplicación
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:dev"]
