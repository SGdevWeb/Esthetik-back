const db = require("../db/dbConfig");

const getPackageByRateId = (rateId) => {
  const query = "SELECT * FROM package WHERE id=?";
  return new Promise((resolve, reject) => {
    db.query(query, [rateId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getPackageByRateId,
};
