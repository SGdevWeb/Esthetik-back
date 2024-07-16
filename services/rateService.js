const db = require("../db/dbConfig");
const { QueryError } = require("./errorService");

const getRates = () => {
  const query = "SELECT * FROM rate";

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération des tarifs : ${error.message}`
          )
        );
      } else {
        resolve(results);
      }
    });
  });
};

const getRateIdByName = (rateName) => {
  const query = "SELECT id FROM rate WHERE name = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [rateName], (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération de l'identifiant du tarif : ${error.message}`
          )
        );
      } else {
        resolve(results);
      }
    });
  });
};

const getRateById = (rateId) => {
  const query = "SELECT * FROM rate WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [rateId], (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération du tarif avec l'ID ${rateId} : ${error.message}`
          )
        );
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getRates,
  getRateIdByName,
  getRateById,
};
