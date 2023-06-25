const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true,
    });
    console.log(`MONGO CONNECTED ${conn.connection.host}`);
  } catch (error) {
    console.error(`ERROR : ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
