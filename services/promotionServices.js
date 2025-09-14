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

const getPromotionById = (promotionId) => {
  const query = "SELECT * FROM promotion WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [promotionId], (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération de la promotion avec l'ID ${promotionId} : ${error.message}`
          )
        );
      } else {
        resolve(results[0]);
      }
    });
  });
};

const createPromotion = (
  title,
  entitled,
  description,
  start,
  end,
  picture,
  rateId
) => {
  const query = `
  INSERT INTO promotion (title, entitled, description, start, end, picture, rate_id) 
  VALUES (?,?,?,?,?,?,?)
  `;
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [title, entitled, description, start, end, picture, rateId],
      (error, result) => {
        if (error) {
          reject(
            new QueryError(
              `Erreur lors de la création de la promotion : ${error.message}`
            )
          );
        } else {
          const insertedId = result.insertId;
          const findQuery = "SELECT * FROM promotion WHERE id = ?";
          db.query(findQuery, [insertedId], (findError, findResult) => {
            if (findError) {
              reject(
                new QueryError(
                  `Erreur lors de la récupération de la promotion crée : ${findError.message}`
                )
              );
            } else {
              resolve(findResult[0]);
            }
          });
        }
      }
    );
  });
};

const deletePromotionById = (promotionId) => {
  const query = "DELETE FROM promotion WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [promotionId], (error, result) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la suppression de l'article : ${error.message}`
          )
        );
      } else {
        resolve(result.affectedRows);
      }
    });
  });
};

const updatePromotionById = async (promotionId, updateFields) => {
  const keys = Object.keys(updateFields);

  if (keys.length === 0) return Promise.resolve(null);

  const setClause = keys.map((key) => `${key} = ?`).join(", ");
  const values = keys.map((key) => updateFields[key]);

  const query = `UPDATE promotion SET ${setClause} WHERE id = ?`;

  return new Promise((resolve, reject) => {
    db.query(query, [...values, promotionId], (error) => {
      if (error) return reject(new QueryError(error.message));

      // On récupère la promotion mise à jour
      const selectQuery = "SELECT * FROM promotion WHERE id = ?";
      db.query(selectQuery, [promotionId], (err, rows) => {
        if (err) reject(new QueryError(err.message));
        else resolve(rows[0]);
      });
    });
  });
};

module.exports = {
  getPromotions,
  getPromotionById,
  createPromotion,
  deletePromotionById,
  updatePromotionById,
};
