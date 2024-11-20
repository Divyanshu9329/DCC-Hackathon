// NodeJS for PAT {Project Assignment & Tracking}

const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');

// In-memory database for projects
let projects = [];

// Create server
const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;

  // Serve Static Files (HTML, CSS, JS)
  if (method === 'GET' && url === '/') {
    serveFile(res, 'public/index.html', 'text/html');
  } else if (method === 'GET' && url === '/style.css') {
    serveFile(res, 'public/style.css', 'text/css');
  } else if (method === 'GET' && url === '/script.js') {
    serveFile(res, 'public/script.js', 'application/javascript');
  }

  // Handle API Requests
  else if (method === 'GET' && url === '/projects') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(projects));
  } else if (method === 'POST' && url === '/projects') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const project = JSON.parse(body);
      projects.push(project);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Project created successfully!', project }));
    });
  } else {
    // Handle unknown routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Helper Function to Serve Files
function serveFile(res, filePath, contentType) {
  const fullPath = path.join(__dirname, filePath);
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
        