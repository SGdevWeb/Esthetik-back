const mysql = require("mysql2");
require("dotenv").config();

function handleDisconnect() {
  const connection = mysql.createConnection({
    host: process.env.MATOMO_DB_HOST,
    user: process.env.MATOMO_DB_USER,
    password: process.env.MATOMO_DB_PASSWORD,
    database: process.env.MATOMO_DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Erreur lors de la connexion à la base de données :", err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log("Connexion à la base de données matomo réussie !");
    }
  });

  connection.on("error", (err) => {
    console.error("Erreur de connexion à la base de données:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Connexion à la base de données perdue. Reconnexion...");
      handleDisconnect();
    } else {
      throw err;
    }
  });

  return connection;
}

const matomoDb = handleDisconnect();

module.exports = matomoDb;
