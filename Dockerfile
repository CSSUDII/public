FROM node:16
WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN npm install
RUN make build

COPY . .

EXPOSE 8080
CMD [ "make", "start" ]
