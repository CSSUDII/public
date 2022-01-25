FROM node:16
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN npm install
RUN ./node_modules/.bin/babel src --out-dir dist --copy-files --extensions .ts,.tsx --source-maps inline

COPY . .

EXPOSE 8080
CMD [ "make", "start" ]
