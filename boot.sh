#!/bin/bash

# Install dependencies during container boot
cd /app/micro-facial-impressions && yarn install

if [ $RELOAD_APP_ON_FILE_CHANGE == "true" ]
  then
    # Reload server whenever a file is saved
    cd /app/micro-facial-impressions && yarn run dev
  else
    cd /app/micro-facial-impressions && yarn run start
fi