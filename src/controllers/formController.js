// Handles logic for GET & POST forms

// --- Handle GET form submission ---
exports.handleGetForm = (req, res) => {
  const input = req.query.inputName;
  res.send(`Received "${input}" from you using GET.`);
};

// --- Handle POST form submission ---
exports.handlePostForm = (req, res) => {
  const input = req.body.inputName;
  res.send(`Received "${input}" from you using POST.`);
};
