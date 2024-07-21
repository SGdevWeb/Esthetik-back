const mysql = require("mysql2");
require("dotenv").config();

// Configuration de la connexion à la base de données Matomo
const matomoDb = mysql.createConnection({
  host: process.env.MATOMO_DB_HOST,
  user: process.env.MATOMO_DB_USER,
  password: process.env.MATOMO_DB_PASSWORD,
  database: process.env.MATOMO_DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

matomoDb.connect((err) => {
  if (err) {
    console.error("Erreur lors de la connexion à la base de données :", err);
    return;
  }
  console.log("Connexion à la base de données matomo réussie !");
});

module.exports = matomoDb;
