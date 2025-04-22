const connectDB = require("../db/dbConnect");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const secretKey = "your-secret-key";

async function updateProfileApi(req, res) {
  try {
    // 1. Verify JWT token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, secretKey);

    // 2. Get user ID correctly from token
    const userId = new ObjectId(decoded.user._id); // Ensure token contains correct _id

    const db = await connectDB();
    const collection = db.collection("users");

    // 3. Only allow username updates
    const { username } = req.body;
    if (!username) {
      return res
        .status(400)
        .json({ success: false, message: "Username required" });
    }

    // 4. Check for existing username
    const existingUser = await collection.findOne({
      _id: { $ne: userId },
      username: username,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    // 5. Perform update
    const result = await collection.findOneAndUpdate(
      { _id: userId },
      { $set: { username } },
      { returnDocument: "after" }
    );

    // if (!result.value) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "User not found",
    //   });
    // }

    return res.json({
      success: true,
      message: "Username updated",
      user: result.value,
    });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}

module.exports = { updateProfileApi };
