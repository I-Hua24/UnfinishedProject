// routes/pokemon.js
const express = require("express");
const router = express.Router();
const db = require("../pkmndb"); // import db connection

// Insert a Pokémon
router.get("/addpokemon", (req, res) => {
    let pokemon = {
        name: "Charmander",
        ndex: 4,
        type1: "Fire",
        type2: "",
        evolution: 5
    };
    let sql = "INSERT INTO pokemon SET ?";
    db.query(sql, pokemon, (err, result) => {
        if (err) res.send("Could not insert new Pokémon");
        else res.send("Pokémon inserted successfully!");
    });
});

// Get all Pokémon (JSON)
router.get("/getpokemon", (req, res) => {
    let sql = "SELECT * FROM pokemon";
    db.query(sql, (err, result) => {
        if (err) res.send("Could not retrieve Pokémon");
        else res.send(result);
    });
});

// Get all Pokémon (formatted plain HTML)
router.get("/getpokemonformatted", (req, res) => {
    let sql = "SELECT * FROM pokemon";
    db.query(sql, (err, result) => {
        if (err) res.send("Could not retrieve Pokémon");
        else {
            let content = "";
            for (let i = 0; i < result.length; i++) {
                content += `${result[i].ndex} - ${result[i].name} (${result[i].type1}/${result[i].type2})<br>`;
            }
            res.send(content);
        }
    });
});

// Get all Pokémon formatted with CSS
router.get("/getpokemoncss", (req, res) => {
    let sql = "SELECT * FROM pokemon";
    db.query(sql, (err, result) => {
        if (err) {
            res.send("Could not retrieve Pokémon");
        } else {
            let content = `
        <html>
        <head>
            <title>List of Pokémon</title>
            <link rel="stylesheet" href="/styles/pkmnstyle.css" >
        </head>
        <body>
          <h1>Pokémon List</h1>
          <table>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type 1</th>
              <th>Type 2</th>
            </tr>
      `;

            for (let i = 0; i < result.length; i++) {
                content += `
          <tr>
            <td>${result[i].ndex}</td>
            <td>${result[i].name}</td>
            <td>${result[i].type1}</td>
            <td>${result[i].type2 || ""}</td>
          </tr>
        `;
            }

            content += `
          </table>
        </body>
        </html>
      `;

            res.send(content);
        }
    });
});


// Update a Pokémon's name by ndex
router.get("/updatepokemon/:ndex", (req, res) => {
    const newName = "Bulbasaur"; // new name for example
    const ndex = req.params.ndex; // get ndex from URL

    // Parameterized query to prevent SQL injection
    const sql = "UPDATE pokemon SET name = ? WHERE ndex = ?";

    db.query(sql, [newName, ndex], (err, result) => {
        if (err) {
            res.send("Could not update Pokémon \n" + err);
        } else {
            res.send(result); // shows affectedRows etc.
        }
    });
});




// Delete a Pokémon by ndex
router.get("/deletepokemon/:ndex", (req, res) => {
    const ndex = req.params.ndex;

    // Parameterized query to prevent SQL injection
    const sql = "DELETE FROM pokemon WHERE ndex = ?";

    db.query(sql, [ndex], (err, result) => {
        if (err) {
            res.send(`Could not delete Pokémon with ndex = ${ndex} \n${err}`);
        } else {
            res.send(result); // shows affectedRows etc.
        }
    });
});

module.exports = router;
/*
TODO:
from database powerpoint
Exercise 1
Exercise 2
Exercise 3
Exercise 4
use http://localhost:8080/phpmyadmin for managing your database
*/