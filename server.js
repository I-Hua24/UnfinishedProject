const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve all static files in 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Maps '/page' to 'public/pages/page.html'
app.get('/:page', (req, res, next) => {
  const pageName = req.params.page;
  const filePath = path.join(__dirname, 'public', 'pages', `${pageName}.html`);

  res.sendFile(filePath, (err) => {
    if (err) {
      next(); // go to 404 if file not found
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
