FROM node:argon

RUN DEBIAN_FRONTEND=noninteractive

RUN apt-get -qq -y update
RUN apt-get -qq -y upgrade

# Create app directory
RUN mkdir -p /app
WORKDIR /app

#COPY package.json /usr/src/app

COPY app/ .

RUN npm install --unsafe-perm








