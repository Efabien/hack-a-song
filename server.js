#!/usr/bin/env node

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const ip = require('ip');
const { telegramClient } = require('./utils/telegram-client');

const { decrypt } = require('./utils/crypto');

const { ENCRYPTION_ALGO, ENCRYPTION_KEY, PORT } = require('./config');

app.use(bodyParser.json({ limit: '11mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/download/:hash', (req, res) => {
  const hash = req.params.hash || '';
  const path = decrypt(hash, ENCRYPTION_ALGO, ENCRYPTION_KEY);
  const file = `${__dirname}/downloads/${path}`;
  if (!fs.existsSync(file)) {
    return res.status(404).json({ message: 'Requested file does not exist' });
  }
  res.download(file);
});

app.post('/notify', (req, res) => {
  const { link, fileName } = req.body;
  telegramClient.shareLink(link, fileName);
  res.end();
});

app.listen(PORT, () => {
  console.log(`Sharing server listening at http://${ip.address()}:${PORT}`);
});
