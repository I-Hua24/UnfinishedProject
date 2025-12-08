const http = require('http');   // HTTP module to create server
const fs = require('fs');       // File system module to read files
const path = require('path');   // Path module to handle file paths


// Create a server object
// The function inside will run every time the server receives a request
// req = incoming request from browser
// res = response we send back to browser
// Create an HTTP server
// The function inside runs every time a client (browser) makes a request
const server = http.createServer((req, res) => {

  // Determine the file path to serve based on the requested URL
  // If the URL is '/' (homepage), serve 'index.html'
  // Otherwise, serve the file that matches the URL inside 'public' folder
  let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

  // Extract the file extension (e.g., .html, .css, .js)
  // This helps in setting the correct Content-Type header for the browser
  let ext = path.extname(filePath);

  // Default Content-Type is 'text/html' (for HTML files)
  let contentType = 'text/html';

  // Set the Content-Type header based on the file extension
  // so the browser knows how to handle the file (HTML, CSS, JS, etc.)
  if (ext === '.js') contentType = 'text/javascript';
  if (ext === '.css') contentType = 'text/css';
  if (ext === '.json') contentType = 'application/json';
  if (ext === '.png') contentType = 'image/png';
  if (ext === '.jpg') contentType = 'image/jpg';


  // Read and send the files asynchronously
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // send error if file can't be read
      res.writeHead(500);
      res.end('Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }



  });
});

// Listen on the port Render assigns
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
