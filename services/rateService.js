const db = require("../db/dbConfig");

const getRates = () => {
  const query = "SELECT * FROM rate";

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

const getRateIdByName = (rateName) => {
  const query = "SELECT id FROM rate WHERE name = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [rateName], (error, results) => {
      if (error) {
        reject(error);
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
        reject(error);
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
