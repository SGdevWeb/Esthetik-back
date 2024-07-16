const db = require("../db/dbConfig");

const getDiscounts = () => {
  const query = `
        SELECT d.id, d.title, d.discount, r.name AS rate
        FROM discount AS d
        JOIN package AS p ON p.id = d.package_id
        JOIN rate AS r ON r.id = p.rate_id
    `;

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération des remises : ${error.message}`
          )
        );
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getDiscounts,
};
