const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/u-to-do').then(() => console.log('Connected to the database…')).catch((error) => console.error('Connection error:', error));

module.exports = mongoose.connection;
