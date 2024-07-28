const db = require("../db/dbConfig");

const getDiscounts = () => {
  const query = `
        SELECT d.id, d.title, d.discount, r.name AS rate, 
          p.name AS forfait, p.id AS package_id
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

const deleteDiscountById = (discountId) => {
  const query = "DELETE FROM discount WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [discountId], (error, result) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la suppression de la remise : ${error.message}`
          )
        );
      } else {
        resolve(result.affectedRows);
      }
    });
  });
};

const updateDiscountById = (discountId, updatedDiscount) => {
  const { title, discount, packageId } = updatedDiscount;

  const query =
    "UPDATE discount SET title = ?, discount = ?, package_id = ?  WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [title, discount, packageId, discountId],
      (error, result) => {
        if (error) {
          reject(
            new QueryError(
              `Erreur lors de la mise à jour de la remise : ${error.message}`
            )
          );
        } else {
          resolve(result.affectedRows);
        }
      }
    );
  });
};

const createDiscount = (title, discount, packageId) => {
  const query =
    "INSERT INTO discount (title, discount, package_id) VALUES (?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(query, [title, discount, packageId], (error, result) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la création de la remise : ${error.message}`
          )
        );
      } else {
        const insertedId = result.insertId;
        const findQuery = "SELECT * FROM discount WHERE id = ?";
        db.query(findQuery, [insertedId], (findError, findResult) => {
          if (findError) {
            reject(
              new QueryError(
                `Erreur lors de la récupération de la remise créé : ${findError.message}`
              )
            );
          } else {
            resolve(findResult[0]);
          }
        });
      }
    });
  });
};

module.exports = {
  getDiscounts,
  deleteDiscountById,
  updateDiscountById,
  createDiscount,
};
