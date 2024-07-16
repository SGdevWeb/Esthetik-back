const db = require("../db/dbConfig");
const { QueryError } = require("./errorService");

const getPromotions = () => {
  const query = `
        SELECT * FROM promotion
    `;

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        new QueryError("Erreur lors de la récupération des promotions.", error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getPromotions,
};
