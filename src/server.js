const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public/
app.use(express.static(path.join(__dirname, '../public')));

// Define routes (this is where you link all your html files)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.get('/WebDevelopment', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/webdev/webdev.html'));
});
app.get('/fonts', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/webdev/fonts.html'));
});
app.get('/forms', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/webdev/form.html'));
});

//TODO: ask if adding more lines is fine or i should make a list  of routes and file names


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
