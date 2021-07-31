#!/bin/bash

# Inject env vars to NextJS
rm /app/micro-facial-impressions/.env.local
printf "NEXT_PUBLIC_SOCKER_IO_HOST=%s\NEXT_PUBLIC_SOCKER_IO_PORT=%s\nNEXT_PUBLIC_SOCKER_IO_PROTOCOL=%s" $NEXT_PUBLIC_SOCKER_IO_HOST $NEXT_PUBLIC_SOCKER_IO_PORT $NEXT_PUBLIC_SOCKER_IO_PROTOCOL >> /app/micro-facial-impressions/.env.local

# Install dependencies during container boot
cd /app/micro-facial-impressions && yarn install

if [ $RELOAD_APP_ON_FILE_CHANGE == "true" ]
  then
    # Reload server whenever a file is saved
    cd /app/micro-facial-impressions && yarn run dev
  else
    cd /app/micro-facial-impressions && yarn run start
fi