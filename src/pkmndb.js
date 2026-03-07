// db.js
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pokemon_db"  // your database
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to DB:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

module.exports = db;
