const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// Homepage
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Friendly URLs for pages in public/pages/
router.get("/:page", (req, res, next) => {
  const pageFile = path.join(__dirname, "../public/pages", `${req.params.page}.html`);
  fs.access(pageFile, fs.constants.F_OK, (err) => {
    if (err) next(); // 404 if not found
    else res.sendFile(pageFile);
  });
});

module.exports = router;
