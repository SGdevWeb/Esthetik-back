const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(bodyParser.json());

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error("Erreur lors de la connexion à la base de données :", err);
    return;
  }
  console.log("Connexion à la base de données réussie !");
});

// Route pour récupérer les données de la table "rate"
app.get("/api/rates", (req, res) => {
  const query = "SELECT * FROM rate";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des tarifs :", err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des tarifs" });
      return;
    }

    res.json(results);
  });
});

module.exports = app;
