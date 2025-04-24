const jwt = require("jsonwebtoken");
const connectDB = require("../db/dbConnect");
const { ObjectId } = require("mongodb");

async function DeleteUser(req, res) {
  try {
    // Extract token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Decode token
    let decoded;
    try {
      decoded = jwt.verify(token, "your-secret-key"); // Make sure to match your signing key
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const userInfo = decoded.user; // assuming token payload = { user: { username: "...", ... } }

    if (!userInfo || !userInfo.username) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }

    // Proceed with deletion
    const { deleteUserId } = req.body;

    if (!ObjectId.isValid(deleteUserId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID!" });
    }

    const db = await connectDB();
    const collection = db.collection("users");

    const result = await collection.deleteOne({
      _id: new ObjectId(deleteUserId),
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("DeleteUser.js: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
}

module.exports = { DeleteUser };
