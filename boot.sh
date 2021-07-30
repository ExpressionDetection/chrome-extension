#!/bin/bash

# Inject env vars to NextJS
rm /app/micro-facial-impressions/.env.local
printf "NEXT_PUBLIC_PUSHER_APP_KEY=%s\nNEXT_PUBLIC_PUSHER_APP_CLUSTER=%s" $NEXT_PUBLIC_PUSHER_APP_KEY $NEXT_PUBLIC_PUSHER_APP_CLUSTER >> /app/micro-facial-impressions/.env.local

# Install dependencies during container boot
cd /app/micro-facial-impressions && yarn install

if [ $RELOAD_APP_ON_FILE_CHANGE == "true" ]
  then
    # Reload server whenever a file is saved
    cd /app/micro-facial-impressions && yarn run dev
  else
    cd /app/micro-facial-impressions && yarn run start
fi