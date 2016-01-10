#Dockerfile for dev environment

FROM centos:latest

RUN yum update -y
#install system packages
RUN yum install -y \
git \
sudo \
vim \
curl \
make \
gcc \
gcc-c++ \
epel-release

#install golang.
RUN mkdir -p /goroot && \
 	curl https://storage.googleapis.com/golang/go1.4.2.linux-amd64.tar.gz | tar xvzf - -C /goroot --strip-components=1
#set enviroment variables.
ENV GOROOT /goroot
ENV GOPATH /gopath
ENV PATH $GOROOT/bin:$GOPATH/bin:$PATH

#install nodejs.
RUN mkdir -p /nodejs && \
	curl https://nodejs.org/dist/v4.2.4/node-v4.2.4-linux-x64.tar.gz | tar xvzf - -C /usr/local --strip-components=1

#define working directory.
RUN mkdir -p /opt/tourdezin/
WORKDIR /opt/tourdezin/

#build tdz_web app.
COPY ./src/tdz_web/package.json tdz_web/package.json
RUN cd tdz_web/; npm install

COPY ./src /opt/tourdezin/

EXPOSE 8080

#define default command.
CMD ["node", "/opt/tourdezin/tdz_web/app.js"]


