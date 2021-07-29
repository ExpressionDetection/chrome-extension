# Video Call Chrome Extension

## Docker setup instructions

* Follow the steps inside the [compose](https://github.com/ExpressionDetection/compose) repository

## Manual setup instructions

* Install [NodeJS](https://nodejs.org/en/) and [Yarn](https://classic.yarnpkg.com/en/)

* Run `cd micro-facial-impressions && yarn install --no-bin-links` to install dependencies

* You can serve the frontend by running `APP_PORT=3000 && yarn run dev`
    * Make sure you're running on port `3000` or change the url from the chrome extension.

## To run the chrome extension locally:

* Open Chrome and navigate to `chrome://extensions`
* Activate the `Developer mode` toggle menu and click `Load unpacked`
* Navigate to the local folder containing the extension code (`./chrome-extension/chrome-extension`) and click `Ok`
* Assuming there are no errors, the extension should load into your browser

Or follow step 2 of the following [guideline](https://support.google.com/chrome/a/answer/2714278?hl=en&ref_topic=4412375)