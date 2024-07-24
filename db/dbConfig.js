const mysql = require("mysql2");
require("dotenv").config();

let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true,
  });

  // Connexion à la base de données
  db.connect((err) => {
    if (err) {
      console.error("Erreur lors de la connexion à la base de données :", err);
      setTimeout(handleDisconnect, 2000);
      console.log("Connexion à la base de données réussie !");
    } else {
      console.log("Connexion à la base de données réussie !");
    }
  });

  db.on("error", (err) => {
    console.error("Erreur de connexion à la base de données:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Connexion à la base de données perdue. Reconnexion...");
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

// Initialiser la première connexion
handleDisconnect();

module.exports = db;
