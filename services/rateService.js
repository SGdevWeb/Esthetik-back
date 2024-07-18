const db = require("../db/dbConfig");
const { QueryError } = require("./errorService");

const getRates = () => {
  const query = "SELECT * FROM rate WHERE is_deleted = FALSE";

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
        resolve(results.length > 0 ? results[0] : null);
      }
    });
  });
};

const addRate = (name, description, img_name, img_title) => {
  const query =
    "INSERT INTO rate (name, description, img_name, img_title) VALUES (?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [name, description, img_name, img_title],
      (error, results) => {
        if (error) {
          reject(
            new QueryError(`Erreur lors de l'ajout du tarif : ${error.message}`)
          );
        } else {
          const newRateId = results.insertId;
          resolve({ id: newRateId, name, description, img_name, img_title });
        }
      }
    );
  });
};

const updateRate = (rateId, newData) => {
  const { name, description, img_name, img_title } = newData;
  const query =
    "UPDATE rate SET name = ?, description = ?, img_name = ?, img_title = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [name, description, img_name, img_title, rateId],
      (error, results) => {
        if (error) {
          reject(
            new QueryError(
              `Erreur lors de la mise à jour du tarif avec l'ID ${rateId} : ${error.message}`
            )
          );
        } else {
          resolve({ id: rateId, name, description, img_name, img_title });
        }
      }
    );
  });
};

const deleteRateById = (rateId) => {
  const query = `
  START TRANSACTION;

  UPDATE service
  SET is_deleted = TRUE
  WHERE rate_id = ?;

  UPDATE rate
  SET is_deleted = TRUE
  WHERE id = ?;

  COMMIT;
  `;

  return new Promise((resolve, reject) => {
    db.query(query, [rateId, rateId], (error, result) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la suppression du type de prestation : ${error.message}`
          )
        );
      } else {
        resolve(result.affectedRows);
      }
    });
  });
};

module.exports = {
  getRates,
  getRateIdByName,
  getRateById,
  addRate,
  updateRate,
  deleteRateById,
};
