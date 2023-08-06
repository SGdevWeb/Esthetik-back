const db = require("../db/dbConfig");

const getPromotions = () => {
  const query = `
        SELECT * FROM promotion
    `;

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getPromotions,
};
