FROM node:16-alpine3.14

ENV RELOAD_APP_ON_FILE_CHANGE=true
ENV APP_PORT=3000

# Install prerequisites
RUN apk update && \
    apk add bash curl inotify-tools

SHELL ["/bin/bash", "-c"]

WORKDIR /app

COPY . /app

CMD /app/boot.sh