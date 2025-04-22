require("dotenv").config();
const axios = require("axios");

const connectDB = require("./db/dbConnect");
const auth = require("./middleware/auth");
const Session = require("./apis/session");
const Logout = require("./apis/logout");
const { SignUpApi } = require("./apis/signup");
const { LoginApi } = require("./apis/login");
const { profilePicUpload } = require("./multer/multerUpload");
const express = require("express");
const cors = require("cors");
// Add this near other route imports
const historyRoutes = require("./apis/history");

const session = require("express-session");
const multer = require("multer");
const { updateProfileApi } = require("./apis/updateProfile");
const aiRoutes = require("./apis/aiRecommendationData");


//initialize app
const app = express();

//initialize PORT No
const PORT = 8000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Configure express-session middleware
// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

app.use("/images/profilePic", express.static("./images/profilePics"));
app.use("/images/productPic", express.static("./images/productPics"));

//Update Profile API
app.post("/updateProfile", updateProfileApi);

//signup API
app.post("/signup", profilePicUpload.single("profilePic"), SignUpApi);

//login API
app.post("/login", LoginApi);

//Session API
app.get("/session", auth, Session);

//logout API
app.post("/logout", Logout);

//fetching all events API
const eventsRoute = require("./apis/events");
app.use("/apis/events", eventsRoute);
app.use("/apis/ai", aiRoutes);


// Add this after other app.use() calls
app.use("/apis/history", historyRoutes);

//search API
const searchRoutes = require("./apis/search");

// Add this after other app.use() calls
app.use("/apis/search", searchRoutes);

//fetching user location API
app.get("/apis/location", async (req, res) => {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    res.json(response.data);
  } catch (err) {
    console.error("IPAPI fetch error:", err);
    res.status(500).json({ error: "Failed to fetch location." });
  }
});


//callback to connect MongoDB
connectDB();

//Activate Server
app.listen(PORT, () => {
  console.log("Server Started on port: ", PORT);
});
