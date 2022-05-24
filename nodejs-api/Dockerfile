FROM node:16.13.1-alpine

ENV TERM=xterm
ENV TZ=Asia/Bangkok

RUN mkdir -p /usr/app/src
WORKDIR /usr/app/src

COPY ./package.json .
RUN yarn install

COPY . .
