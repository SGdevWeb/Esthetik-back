const db = require("../db/dbConfig");

const getLocations = () => {
  const query = "SELECT * FROM location ORDER BY name";

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        const resultsLowercase = results.map((location) => {
          const { name, ...other } = location;
          return {
            ...other,
            name: name.toLowerCase(),
          };
        });
        resolve(resultsLowercase);
      }
    });
  });
};

const createLocation = (newLocation) => {
  const query = "INSERT INTO location (name) VALUES (?)";
  return new Promise((resolve, reject) => {
    db.query(query, [newLocation], (error, result) => {
      if (error) {
        reject(error);
      } else {
        const insertedId = result.insertId;
        const findQuery = "SELECT * FROM location WHERE id = ?";
        db.query(findQuery, [insertedId], (findError, findResult) => {
          if (findError) {
            reject(findError);
          } else {
            resolve(findResult[0]);
          }
        });
      }
    });
  });
};

const deleteLocationById = (locationId) => {
  const query = "DELETE FROM location WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [locationId], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.affectedRows);
      }
    });
  });
};

const updateLocationById = (locationId, updatedLocation) => {
  const query = "UPDATE location SET name = ? WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [updatedLocation.name, locationId], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.affectedRows);
      }
    });
  });
};

module.exports = {
  getLocations,
  createLocation,
  deleteLocationById,
  updateLocationById,
};
