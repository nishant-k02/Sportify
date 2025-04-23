const MongoClient = require("mongodb").MongoClient;

//MongoDB Connection
const connectDB = async () => {
  try {
    const client = await MongoClient.connect(
      "your-mongodb-connection-string" // Replace with your MongoDB connection string
    );
    console.log("DB Connected!");
    return client.db(); // Return the danishant-k02/frontendtabase object for further usage
  } catch (error) {
    console.log("DB Connection Error: ", error);
    throw error;
  }
};

module.exports = connectDB;
