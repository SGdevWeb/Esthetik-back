const db = require("../db/dbConfig");

const getAdministratorByUsername = (username) => {
  const query = "SELECT * FROM administrator WHERE username = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [username], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const result = results[0];
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAdministratorByUsername,
};
