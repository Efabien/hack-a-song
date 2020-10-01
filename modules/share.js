const ip = require('ip');
const chalk = require('chalk');
const config = require('../config');
const request = require('request-promise');

const share = async (hash, fileName) => {
  const ipAddress = ip.address();
  const host = `http://${ipAddress}:${config.PORT}`;
  const link = `${host}/download/${hash}`;
  console.log(
    chalk.blue.bold(`🔗 your link : ${link}`)
  );
  await notify(`${host}/notify`, link, fileName);
};

const notify = (uri, link, fileName) => {
  return request({
    method: 'POST',
    uri,
    body: { link, fileName },
    json: true
  });
};

module.exports = { share };
