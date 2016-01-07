#Dockerfile for dev environment

FROM centos:latest

RUN yum update -y
#install system packages
RUN yum install -y \
git \
sudo \
vim \
curl
#install golang.
RUN mkdir -p /goroot && \
 	curl https://storage.googleapis.com/golang/go1.4.2.linux-amd64.tar.gz | tar xvzf - -C /goroot --strip-components=1
#set enviroment variables.
ENV GOROOT /goroot
ENV GOPATH /gopath
ENV PATH $GOROOT/bin:$GOPATH/bin:$PATH

#define working directory.
WORKDIR /gopath

#define default command.
CMD ["bash"]


