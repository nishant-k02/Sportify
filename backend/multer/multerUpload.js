const multer = require("multer");

//profile pic storage
const profilePicStorage = multer.diskStorage({
  //path to store the profilePic
  destination: (req, file, cb) => {
    cb(null, "./images/profilePics");
  },

  //filename to give to the profilePic
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const profilePicUpload = multer({ storage: profilePicStorage });

// Multer setup for file upload
// Configure Multer for profile picture uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images/profilePic"); // adjust path as needed
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

module.exports = { profilePicUpload, upload };
