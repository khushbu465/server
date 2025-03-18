const mongoose = require("mongoose");
require("dotenv").config();

const dburi = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dburi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
