const io = require('socket.io-client');
const crypto = require('crypto');
const fs = require('fs');
const data = require('./data.json'); // Constant list of values

const socket = io.connect('http://localhost:3000'); // Replace with the listener service URL
const encryptionKey = 'your_encryption_key';

const getRandomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateSecretKey = (message) => {
  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(message));
  return hash.digest('hex');
};

const encryptMessage = (message) => {
  const cipher = crypto.createCipher('aes-256-ctr', encryptionKey);
  return cipher.update(JSON.stringify(message), 'utf8', 'hex') + cipher.final('hex');
};

const generateRandomStream = () => {
  const stream = [];
  const count = Math.floor(Math.random() * (499 - 49 + 1)) + 49;

  for (let i = 0; i < count; i++) {
    const message = {
      name: getRandomValue(data.names),
      origin: getRandomValue(data.origins),
      destination: getRandomValue(data.destinations),
    };

    message.secret_key = generateSecretKey(message);
    const encryptedMessage = encryptMessage(message);
    stream.push(encryptedMessage);
  }

  return stream.join('|');
};

const emitData = () => {
  const stream = generateRandomStream();
  socket.emit('data-stream', stream);
};

setInterval(emitData, 10000);
