const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const fs = require('fs');
const os = require('os');
const chalk = require('chalk');
const cliProgress = require('cli-progress');
const config = require('../config');

class Scrapper {
  constructor(config) {
    this.Ytd = new YoutubeMp3Downloader(config);
    this.barPorgress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    this._processing;
    this._init();
  }

  _init() {
    this.Ytd.on("finished", (err, data) => {
      this.barPorgress.stop();
      moveFile(data);
    });
     
    this.Ytd.on("error", (error) => {
      console.log(chalk.red(error));
    });
     
    this.Ytd.on("progress", (progress) => {
      this.barPorgress.update(progress.progress.percentage)
    });
  }

  download(videoId) {
    this._processing = videoId;
    this.barPorgress.start(0, 100);
    this.Ytd.download(videoId);
  }
}

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
