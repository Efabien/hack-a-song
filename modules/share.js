const ip = require('ip');
const chalk = require('chalk');
const config = require('../config');

const share = (hash) => {
  const ipAddress = ip.address();
  console.log(
    chalk.blue.bold(`http://${ipAddress}:${config.PORT}/download/${hash}`)
  );
};

module.exports = { share };
