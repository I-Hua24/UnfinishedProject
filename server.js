const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve all static assets in public/
app.use(express.static(path.join(__dirname, 'public')));

// Serve homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve all pages inside public/pages/ with friendly URLs
app.get('/:page', (req, res, next) => {
  const pageFile = path.join(__dirname, 'public', 'pages', `${req.params.page}.html`);
  
  // Check if the file exists
  fs.access(pageFile, fs.constants.F_OK, (err) => {
    if (err) {
      next(); // file doesn't exist → 404
    } else {
      res.sendFile(pageFile);
    }
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send('404 Page Not Found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
