FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

# Añade las siguientes líneas para crear la base de datos:
ENV MONGO_INITDB_ROOT_USERNAME=admin
ENV MONGO_INITDB_ROOT_PASSWORD=SocialUP
ENV MONGO_INITDB_DATABASE=socialup-time

COPY . .

CMD ["npm", "run", "dev"]