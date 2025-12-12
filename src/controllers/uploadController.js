const multer = require("multer");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/logo/"),
  filename: (req, file, cb) => cb(null, "Logo-" + file.originalname),
});

const upload = multer({ storage: storage });

// Upload handler
const handleUpload = (req, res) => {
  const input = req.body.inputName;
  if (!req.file) return res.send("No file uploaded.");
  res.send(`
    Text received: ${input}<br>
    File uploaded: ${req.file.filename}
  `);
};

module.exports = { upload, handleUpload };
