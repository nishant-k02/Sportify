const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected!");
    return client.db(); // Return the database object
  } catch (error) {
    console.log("DB Connection Error: ", error);
    throw error;
  }
};

module.exports = connectDB;
