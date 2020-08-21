const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const fs = require('fs');
const os = require('os');
const chalk = require('chalk');
const config = require('../config');

const scraper = new YoutubeMp3Downloader(config);
 
scraper.on("finished", (err, data) => {
  moveFile(data);
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

const logDone = (fileName) => {
  console.log(
    chalk.green.bold(
      JSON.stringify(
        `Done : ${fileName}`
      )
    )
  );
};

const mkdir = (dirname) => {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
  return dirname;
}

const moveFile = (data) => {
  const downloadDir = `${os.homedir()}/Documents/hack/songs/downloads`;
  const newDirName = mkdir(`${downloadDir}/${data.artist}`);
  const fileName = data.file.replace(`${downloadDir}/`, '');
  const newName = `${newDirName}/${fileName}`;
  fs.rename(
    data.file,
    newName,
    (error) => {
      if (error) console.log(chalk.red(error));
      logDone(newName);
    }
  );
};

module.exports = { scraper };
