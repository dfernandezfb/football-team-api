const mongoose = require('mongoose');

const connectDB = async()=>{
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('DB CONNECTED');
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectDB;