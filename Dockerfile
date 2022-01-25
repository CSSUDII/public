FROM node:16
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn
COPY . .

RUN yarn prisma generate

# Build
RUN ./node_modules/.bin/babel src --out-dir dist --copy-files --extensions .ts,.tsx --source-maps inline

EXPOSE 8080
CMD [ "make", "start" ]
