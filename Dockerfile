#########################
### build environment ###
#########################

# Adapted from http://mherman.org/blog/2018/02/26/dockerizing-an-angular-app/
# base image
FROM node:10-alpine as dev

# set working directory
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies

COPY package*.json ./
RUN npm ci --force

# Test stage
FROM dev as testing

COPY ./*.json ./
COPY ./compress.js ./
COPY ./src ./src
COPY ./e2e ./e2e

# run tests
RUN npm test

# generate build
RUN npm run build

# base image
FROM abiosoft/caddy:0.11.1-no-stats as prod
COPY --from=testing /usr/src/app/dist/analytics-frontend /srv
COPY --from=testing /usr/src/app/test_results /test_results
COPY ./Caddyfile /etc/Caddyfile
