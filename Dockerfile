FROM node:16-alpine3.14

ENV RELOAD_APP_ON_FILE_CHANGE=true
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_PUSHER_APP_KEY=adbeaa1d731202934e15
ENV NEXT_PUBLIC_PUSHER_APP_CLUSTER=us3
ENV APP_PORT=3000

# Install prerequisites
RUN apk update && \
    apk add bash curl

SHELL ["/bin/bash", "-c"]

WORKDIR /app

COPY . /app

CMD /app/boot.sh