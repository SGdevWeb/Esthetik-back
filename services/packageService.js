const db = require("../db/dbConfig");
const { QueryError } = require("./errorService");

const getPackageByRateId = (rateId) => {
  const query = "SELECT * FROM package WHERE id=?";
  return new Promise((resolve, reject) => {
    db.query(query, [rateId], (error, results) => {
      if (error) {
        reject(
          new QueryError("Erreur lors de la récupération des forfaits.", error)
        );
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getPackageByRateId,
};
