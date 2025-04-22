const connectDB = require("../db/dbConnect");

async function SignUpApi(req, res) {
  try {
    const db = await connectDB();
    const collection = db.collection("users");

    const { username, email, phone, password, role } = req.body;
    const profilePic = req.file.filename;

    // Add username validation
    const requiredFields = {
      username: "Username is required!",
      email: "Email is required!",
      phone: "Phone is required!",
      password: "Password is required!",
      role: "Role is required!",
      profilePic: "Profile picture is required!",
    };

    for (const [field, message] of Object.entries(requiredFields)) {
      if (!req.body[field] && field !== "profilePic") {
        return res.status(400).json({ success: false, message });
      }
    }

    // Check for existing username or email
    const existingUser = await collection.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const conflictField = existingUser.email === email ? "Email" : "Username";
      return res.status(409).json({
        success: false,
        message: `${conflictField} already exists!`,
      });
    }

    await collection.insertOne({
      username,
      email,
      phone,
      password,
      role,
      profilePic,
    });

    return res.status(201).json({
      success: true,
      message: "Registration Successful",
      user: { username },
    });
  } catch (error) {
    console.error("Registration Failed:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { SignUpApi };
