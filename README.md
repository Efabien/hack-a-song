# hack-a-song
# Description
This week-end project is a cli tool for converting youtube video to mp3, dowloading it and
making it available for sharing to devices connected to the same network by generating a dowloadable link.
The generated link is shared via telegram by using a telegram bot.

## Telegram integration
First you need to create a telegram bot.
Create a telegram account if you don't have on yet and dm @BotFather.
Follow the instruction and at the end of the process he will provide you a secret token,
used for interacting with the telegram APIs.
To obtain your chat ID, dm your bot and check out your console.
## Configuration
Edit the file config/index so as to provide the following configuration values :
- outputPath // Output file location (default: the home directory)
- ENCRYPTION_KEY //for encrypting the dowloadable link
- PORT // port of the sharing server
- TELEGRAM_TOKEN // token required for using telegram API
- TELEGRAM_CHAT_ID // telegram chat id where to receive notifications

Go to the project folder and install it globally :
```bash
npm install songs -g
```
Make sure to run the server :
```bash
node server.js
```
A better approache is to run the server as a [service](https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service/29042953#29042953)
## Usage
For converting and downloading a video from youtube :
```bash
yds -u <youtube-url>
```
For generating a downloadable link of an already stored mp3 file, so as to share it with a device on the same network :
``` bash
yds -g <part-of-the-file-name>
```
For getting the list of available songs
``` bash
yds -l
```
