require('dotenv').config();
const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    if (!this.connection) {
      const uri = process.env.MONGODB_URI;
      this.connection = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('MongoDB connected!');
    }

    return this.connection;
  }
}

module.exports = new Database();