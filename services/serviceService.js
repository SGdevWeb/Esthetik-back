const db = require("../db/dbConfig");

const getServices = () => {
  const query = "SELECT * FROM service";

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

const getServicesByRate = async (rateId) => {
  const query = "SELECT * FROM service WHERE rate_id = ?";

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

const getServicesWithRates = () => {
  const query = `
        SELECT r.id AS rate_id, r.name AS rate_name, s.id AS service_id, s.title AS service_title, s.price AS service_price
        FROM rate r
        JOIN service s ON r.id = s.rate_id
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
  getServicesWithRates,
  getServices,
  getServicesByRate,
};
