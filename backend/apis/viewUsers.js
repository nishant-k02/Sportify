const connectDB = require("../db/dbConnect");

async function ViewusersData(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("users");

    // Fetch only users with role "0"
    const usersData = await collection.find({ role: "0" }).toArray();

    if (usersData.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Users Found!" });
    }

    res.status(200).json({
      data: usersData,
      success: true,
      message: "Users Fetched Successfully!",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Something went wrong!" });
  }
}

module.exports = { ViewusersData };
