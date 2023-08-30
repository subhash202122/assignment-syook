const io = require('socket.io')(3000);
const crypto = require('crypto');
const MongoClient = require('mongodb').MongoClient;

const encryptionKey = 'fdkjgDSZmcnKJLKldkK';
const url = 'mongodb://localhost:27017_assignment';
const dbName = 'time_series_db';

io.on('connection', (socket) => {
  console.log('Emitter connected');

  socket.on('data-stream', (stream) => {
    const messages = stream.split('|');
    const decryptedMessages = [];

    messages.forEach((encryptedMessage) => {
      const decipher = crypto.createDecipher('aes-256-ctr', encryptionKey);
      const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf8') + decipher.final('utf8');
      decryptedMessages.push(JSON.parse(decryptedMessage));
    });

    saveToMongo(decryptedMessages);
  });
});

const saveToMongo = async (messages) => {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('time_series_data');

    const currentTime = new Date();
    const currentMinute = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes());

    await collection.updateOne(
      { timestamp: currentMinute },
      { $push: { data: { $each: messages } } },
      { upsert: true }
    );

    console.log('Data saved to MongoDB');
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
  } finally {
    client.close();
  }
};
