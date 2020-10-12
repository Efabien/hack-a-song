const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const fs = require('fs');
const os = require('os');
const chalk = require('chalk');
const cliProgress = require('cli-progress');
const config = require('../config');
const { encrypt } = require('../utils/crypto');
const { share } = require('./share');

class Scrapper {
  constructor(config) {
    this.Ytd = new YoutubeMp3Downloader(config);
    this.barPorgress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    this._processing;
    this._init();
  }

  _init() {
    this.Ytd.on("finished", (err, data) => {
      if (err) {
        return console.log(chalk.red('Download error :', err));
      }
      this.barPorgress.stop();
      this._processing = null;
      moveFile(data);
    });
     
    this.Ytd.on("error", (error) => {
      console.log(chalk.red(error));
    });
     
    this.Ytd.on("progress", (progress) => {
      this.barPorgress.update(progress.progress.percentage)
    });
  }

  download(url) {
    const videoId = this._extractId(url);
    console.log(chalk.white.bold(`🔃 Start downloading ${url}`));
    this._processing = videoId;
    this.barPorgress.start(100, 0);
    this.Ytd.download(videoId);
  }

  _extractId(url) {
    const matchs = url.match(/v=(\w*)&?/);
    return matchs[1];
  }
}

const logDone = (fileName) => {
  console.log(
    chalk.green.bold(
        `✅ : ${fileName}`
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
  const downloadDir = config.outputPath;
  const newDirName = mkdir(`${downloadDir}/${data.artist}`);
  const fileName = data.file.replace(`${downloadDir}/`, '');
  const newName = `${newDirName}/${fileName}`;
  const hash = encrypt(`${data.artist}/${fileName}`, config.ENCRYPTION_ALGO, config.ENCRYPTION_KEY);
  fs.rename(
    data.file,
    newName,
    (error) => {
      if (error) return console.log(chalk.red(error));
      logDone(newName);
      share(hash, fileName);
    }
  );
};

const scraper = new Scrapper(config);

module.exports = { scraper };
