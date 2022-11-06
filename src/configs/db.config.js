const moogoose = require('mongoose');
require('dotenv').config();

const ACTION = '';

let { MONGODB_URI } = process.env;

if (ACTION === 'test') {
  MONGODB_URI = process.env.MONGODB_TEST_URI;
}

// Connect to mongodb
function connectToMongoDB() {
  moogoose.connect(MONGODB_URI);

  moogoose.connection.on('connected', () => {
    console.log('Connected to MongoDB successfully');
  });

  moogoose.connection.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
  });
}

module.exports = connectToMongoDB;
