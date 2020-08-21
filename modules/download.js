const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const chalk = require('chalk');
const config = require('../config');

const scraper = new YoutubeMp3Downloader(config);
 
scraper.on("finished", (err, data) => {
  console.log(
    chalk.green.bold(
      JSON.stringify(
        `Done : ${data.file}`
        )
      )
    );
});
 
scraper.on("error", (error) => {
  console.log(chalk.red(error));
});
 
scraper.on("progress", (progress) => {
  console.log(
    chalk.blue(
      JSON.stringify(
        `${progress.videoId} : ${Math.floor(progress.progress.percentage)}%`
        )
      )
    );
});

module.exports = { scraper };
