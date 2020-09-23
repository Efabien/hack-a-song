#!/usr/bin/env node

const yargs = require('yargs');
const { scraper } = require('./modules/download');
const { generate } = require('./modules/generate');
const { lists } = require('./modules/lists');
const options = yargs
 .usage('Usage: -u <youtube url>')
 .option(
    'u',
    {
      alias: 'url',
      describe: 'Url of the video to convert and download',
      type: 'string',
      demandOption: false 
    }
  )
 .option(
    'g',
    {
      alias: 'generate',
      describe: 'Generate a download link for an existing song matching the name argument',
      type: 'string',
      demandOption: false
    }
  )
 .option(
    'l',
    {
      alias: 'list',
      describe: 'Gives the list of available files',
      type: 'boolean',
      demandOption: false
    }
  ).argv;

const run = (options) => {
  if (options.url) return scraper.download(options.url);
  if (options.generate) return generate(options.generate);
  if (options.list) return lists();
}

run(options);
