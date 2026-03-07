const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");

// POST file upload
router.post("/formHandlerMulter", uploadController.upload.single("logoFile"), uploadController.handleUpload);

module.exports = router;
