const crypto = require('crypto');

const encrypt = (text, algorithm, password) => {
  const cipher = crypto.createCipher(algorithm, password);
  let crypted = cipher.update(text,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
};
 
const decrypt = (text, algorithm, password) => {
  const decipher = crypto.createDecipher(algorithm, password);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

module.exports = { encrypt, decrypt };
