FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install
ENV DB_USER=admin
ENV DB_PWD=SocialUP
ENV DB_NAME=socialup-time
COPY . .

CMD ["npm", "run", "dev"]