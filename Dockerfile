FROM node:17-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", ".yarn/**", "./"]
RUN yarn --immutable
COPY . .
RUN yarn gulp
RUN yarn tsc
RUN yarn database:generate
EXPOSE 8080
RUN chown -R node /usr/src/app
USER node
CMD ["node", "-r", ".pnp.cjs", "dist/index.js"]
