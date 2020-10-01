const os = require('os');
const { execSync } = require('child_process');
const chalk = require('chalk');
const prompt = require('prompt');
const colors = require('colors/safe');
const config = require('../config');
const { encrypt } = require('../utils/crypto');
const { share } = require('./share');

prompt.message = colors.blue('Which file would you like to share ?');
prompt.delimiter = colors.green(' | ');

const generate = (name) => {
  const outPut = exec(name);
  if (noFile(outPut)) {
    return handleError(`No such file with ${name} in it name`);
  }

  outPut.forEach((song, index) => {
    console.log(chalk.white.bold(`${index} - ${song}`));
  });

  prompt.start();
   
  prompt.get({
    properties: {
      choice: {
        description: colors.cyan('Type the corresponding index')
      }
    }
  }, (err, result) => {
    const choice = outPut[result.choice];
    const toHash = choice.replace(`${config.outputPath}/`, '');
    console.log(colors.cyan(`Generating link for ${toHash} ...`));

    const hash = encrypt(toHash, config.ENCRYPTION_ALGO, config.ENCRYPTION_KEY);
    share(hash, toHash);
  });
};

const noFile = (outPut) => {
  return outPut.every(item => !item);
}

const handleError = (message) => {
  console.error(
    chalk.red.bold(message)
  );
};

const exec = (name) => {
  return execSync(`find ${config.outputPath} -iname *${name}*.mp3`)
    .toString('utf-8').split('\n').slice(0, -1);
}

module.exports = { generate };
