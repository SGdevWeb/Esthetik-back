const db = require("../db/dbConfig");
const { AuthenticationError } = require("./errorService");

const getAdministratorByUsername = (username) => {
  const query = "SELECT * FROM administrator WHERE username = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const admin = results[0];

        if (!admin) {
          reject(new AuthenticationError("Utilisateur non trouvé"));
        }

        resolve(admin);
      }
    });
  });
};

module.exports = {
  getAdministratorByUsername,
};
