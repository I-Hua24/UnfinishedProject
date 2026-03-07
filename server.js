const http = require('http');   // HTTP module to create server
const fs = require('fs');       // File system module to read files
const path = require('path');   // Path module to handle file paths


// Create a server object
// The function inside will run every time the server receives a request
// req = incoming request from browser
// res = response we send back to browser
const server = http.createServer((req, res) => {
  // Map the requested URL to a file
  let filePath;
  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(__dirname, 'index.html');
  } else {
    // For anything else, return 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Page Not Found');
    return;
  }


  // Read and send the HTML file
  fs.readFile(filePath, (err, content) => {  // read the file asynchronously
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' }); // send error if file can't be read
      res.end('Server Error');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' }); // tell browser it's HTML
    res.end(content); // send the HTML content to browser
  });
});

// Listen on the port Render assigns
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
