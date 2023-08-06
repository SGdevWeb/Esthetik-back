const db = require("../db/dbConfig");

const getLocations = () => {
  const query = "SELECT * FROM location";

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        const resultsLowercase = results.map((location) => {
          return {
            name: location.name.toLowerCase(),
          };
        });
        resolve(resultsLowercase);
      }
    });
  });
};

module.exports = {
  getLocations,
};
