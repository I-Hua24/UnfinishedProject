// routes/form.js
const express = require("express");
const router = express.Router();
// Serve the HTML page
router.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages/form.html"));
});

// --- Handle GET form submission ---
router.get("/formHandler", (req, res) => {
  const input = req.query.inputName;
  res.send(`Received "${input}" from you using GET.`);
});

// --- Handle POST form submission ---
router.post("/formHandler", (req, res) => {
  const input = req.body.inputName;
  res.send(`Received "${input}" from you using POST.`);
});

module.exports = router;
