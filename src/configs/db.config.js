const mongoose = require('mongoose');
require('dotenv').config();

const ACTION = 'test';

let { MONGODB_URI } = process.env;

if (ACTION === 'test') {
  MONGODB_URI = process.env.MONGODB_TEST_URI;
}

// Connect to mongodb
function connectToMongoDB() {
  mongoose.connect(MONGODB_URI);

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
  });
}

module.exports = connectToMongoDB;
