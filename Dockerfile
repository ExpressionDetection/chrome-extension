FROM node:16-alpine3.14

ENV RELOAD_APP_ON_FILE_CHANGE=true
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_SOCKER_IO_PROTOCOL=http
ENV NEXT_PUBLIC_SOCKER_IO_HOST=localhost
ENV NEXT_PUBLIC_SOCKER_IO_PORT=3001
ENV APP_PORT=3000

# Install prerequisites
RUN apk update && \
    apk add bash curl git

SHELL ["/bin/bash", "-c"]

WORKDIR /app

COPY . /app

CMD /app/boot.sh