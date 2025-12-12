const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse POST form data
app.use(express.urlencoded({ extended: false }));

// Middleware to Serve static files in public/
app.use(express.static(path.join(__dirname, "public")));


// Import routes
const pagesRoutes = require("./routes/pages");
const formRoutes = require("./routes/form");
const uploadRoutes = require("./routes/upload");

// Use routes
app.use("/", pagesRoutes);
app.use("/", formRoutes);
app.use("/", uploadRoutes);

// 404 handler
app.use((req, res) => res.status(404).send("404 Page Not Found"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* use the following
http://localhost:3000
*/
