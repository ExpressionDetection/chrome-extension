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

COPY .ssh /root/.ssh
COPY . /app

# Install dependencies
RUN rm /app/micro-facial-impressions/.env.local && \
    printf "NEXT_PUBLIC_SOCKER_IO_HOST=%s\NEXT_PUBLIC_SOCKER_IO_PORT=%s\nNEXT_PUBLIC_SOCKER_IO_PROTOCOL=%s" $NEXT_PUBLIC_SOCKER_IO_HOST $NEXT_PUBLIC_SOCKER_IO_PORT $NEXT_PUBLIC_SOCKER_IO_PROTOCOL >> /app/micro-facial-impressions/.env.local && \
    cd /app/micro-facial-impressions && yarn install

CMD /app/boot.sh