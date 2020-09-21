#!/usr/bin/env node

const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const ip = require('ip');

const { decrypt } = require('./utils/crypto');

const { ENCRYPTION_ALGO, ENCRYPTION_KEY, PORT } = require('./config');

app.use(cors());

app.get('/download/:hash', (req, res) => {
  const hash = req.params.hash || '';
  const path = decrypt(hash, ENCRYPTION_ALGO, ENCRYPTION_KEY);
  const file = `${__dirname}/downloads/${path}`;
  if (!fs.existsSync(file)) {
    return res.status(404).json({ message: 'Requested file does not exist' });
  }
  res.download(file); // Set disposition and send it.
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://${ip.address()}:${PORT}`);
});