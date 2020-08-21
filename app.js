#!/usr/bin/env node

const yargs = require('yargs');
const chalk = require('chalk');
const { scraper } = require('./modules/download');
const options = yargs
 .usage('Usage: -u <youtube url>')
 .option(
    'u',
    {
      alias: 'url',
      describe: 'Url of the video to convert and download',
      type: 'string',
      demandOption: true 
    }
  ).argv;

const run = (url) => {
  const videoId = url.split('watch?v=')[1];
  console.log(chalk.white.bold(`Start downloading ${url}`));
  scraper.download(videoId);
}

run(options.url);
