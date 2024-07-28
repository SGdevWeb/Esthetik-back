const db = require("../db/dbConfig");
const { QueryError } = require("./errorService");

const getPackageByRateId = (rateId) => {
  const query = "SELECT * FROM package WHERE id=?";
  return new Promise((resolve, reject) => {
    db.query(query, [rateId], (error, results) => {
      if (error) {
        reject(
          new QueryError("Erreur lors de la récupération des forfaits.", error)
        );
      } else {
        resolve(results);
      }
    });
  });
};

const deletePackageById = (packageId) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((error) => {
      if (error) {
        reject(
          new QueryError("Erreur lors du début de la transaction.", error)
        );
        return;
      }

      // Suppression des discounts associés
      const deleteDiscountsQuery = "DELETE FROM discount WHERE package_id = ?";
      db.query(deleteDiscountsQuery, [packageId], (error, discountResult) => {
        if (error) {
          return db.rollback(() => {
            reject(
              new QueryError(
                "Erreur lors de la suppression des remises associées.",
                error
              )
            );
          });
        }

        // Suppression du package
        const deletePackageQuery = "DELETE FROM package WHERE id = ?";
        db.query(deletePackageQuery, [packageId], (error, packageResult) => {
          if (error) {
            return db.rollback(() => {
              reject(
                new QueryError(
                  "Erreur lors de la suppression du forfait.",
                  error
                )
              );
            });
          }

          db.commit((error) => {
            if (error) {
              return db.rollback(() => {
                reject(
                  new QueryError(
                    "Erreur lors de la validation de la transaction.",
                    error
                  )
                );
              });
            }
            resolve({
              discountsDeleted: discountResult.affectedRows,
              packageDeleted: packageResult.affectedRows,
            });
          });
        });
      });
    });
  });
};

const createPackage = (name, rateId, discounts) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((transactionError) => {
      if (transactionError) {
        return reject(
          new QueryError(
            `Erreur lors du démarrage de la transaction : ${transactionError.message}`
          )
        );
      }

      const packageQuery = "INSERT INTO package (name, rate_id) VALUES (?, ?)";
      db.query(packageQuery, [name, rateId], (packageError, packageResult) => {
        if (packageError) {
          return db.rollback(() => {
            reject(
              new QueryError(
                `Erreur lors de la création du forfait : ${packageError.message}`
              )
            );
          });
        }

        const packageId = packageResult.insertId;
        const discountQueries = discounts.map((discount) => {
          return new Promise((resolveDiscount, rejectDiscount) => {
            const discountQuery =
              "INSERT INTO discount (title, discount, package_id) VALUES (?, ?, ?)";
            db.query(
              discountQuery,
              [discount.title, discount.discount, packageId],
              (discountError, discountResult) => {
                if (discountError) {
                  return rejectDiscount(
                    new QueryError(
                      `Erreur lors de la création de la réduction : ${discountError.message}`
                    )
                  );
                }
                resolveDiscount(discountResult);
              }
            );
          });
        });

        Promise.all(discountQueries)
          .then(() => {
            db.commit((commitError) => {
              if (commitError) {
                return db.rollback(() => {
                  reject(
                    new QueryError(
                      `Erreur lors de la validation de la transaction : ${commitError.message}`
                    )
                  );
                });
              }

              const findPackageQuery = "SELECT * FROM package WHERE id = ?";
              db.query(
                findPackageQuery,
                [packageId],
                (findPackageError, findPackageResult) => {
                  if (findPackageError) {
                    reject(
                      new QueryError(
                        `Erreur lors de la récupération du forfait créé : ${findPackageError.message}`
                      )
                    );
                  } else {
                    resolve(findPackageResult[0]);
                  }
                }
              );
            });
          })
          .catch((discountError) => {
            db.rollback(() => {
              reject(discountError);
            });
          });
      });
    });
  });
};

const updatePackage = (packageId, rateId, name, discounts) => {
  const updatePackageQuery = `
    UPDATE package 
    SET name = ?, rate_id = ? 
    WHERE id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(updatePackageQuery, [name, rateId, packageId], (error, result) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la mise à jour du forfait : ${error.message}`
          )
        );
      } else {
        if (discounts && discounts.length > 0) {
          updateDiscounts(packageId, discounts)
            .then(() => {
              resolve(result.affectedRows);
            })
            .catch((discountError) => {
              reject(discountError);
            });
        } else {
          resolve(result.affectedRows);
        }
      }
    });
  });
};

const updateDiscounts = (packageId, discounts) => {
  const deleteDiscountsQuery = `
    DELETE FROM discount 
    WHERE package_id = ?
  `;

  const insertDiscountQuery = `
    INSERT INTO discount (title, discount, package_id) 
    VALUES ?
  `;

  return new Promise((resolve, reject) => {
    db.query(deleteDiscountsQuery, [packageId], (deleteError, deleteResult) => {
      if (deleteError) {
        reject(
          new QueryError(
            `Erreur lors de la suppression des remises existantes : ${deleteError.message}`
          )
        );
      } else {
        const discountValues = discounts.map((discount) => [
          discount.title,
          discount.discount,
          packageId,
        ]);

        db.query(
          insertDiscountQuery,
          [discountValues],
          (insertError, insertResult) => {
            if (insertError) {
              reject(
                new QueryError(
                  `Erreur lors de l'insertion des nouvelles remises : ${insertError.message}`
                )
              );
            } else {
              resolve(insertResult.affectedRows);
            }
          }
        );
      }
    });
  });
};

module.exports = {
  getPackageByRateId,
  deletePackageById,
  createPackage,
  updatePackage,
};
