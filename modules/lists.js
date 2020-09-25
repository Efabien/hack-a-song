const fs = require('fs');
const chalk = require('chalk');
const config = require('../config');

const lists = () => {
  readContent(config.outputPath, (folders) => {
    logLists(folders);
  });
};

const readContent = (path, callback) => {
  fs.readdir(path, (err, files) => {
    if (err) return console.log(chalk.red(`Unable to scan directory: ${err} `));
    callback(files);
  });
};

const logLists = (folders) => {
  folders.forEach(folderName => {
    readContent(`${config.outputPath}/${folderName}`, (files) => {
      logFolderName(folderName);
      logFiles(files)
    });
  })
};

const logFiles = (files) => {
  files.forEach((file, index) => {
    logFileName(file, index);
  });
};

const logFolderName = (name) => {
  console.log(chalk.bold.blue(` -- ${name} --`));
};

const logFileName = (name, index) => {
  console.log(chalk.white(`    ${index} - ${name}`));
};

module.exports = { lists };
