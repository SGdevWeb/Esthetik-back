const db = require("../db/dbConfig");

const getAdministratorByUsername = (username) => {
  const query = "SELECT * FROM administrator WHERE username = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getAdministratorByUsername,
};
