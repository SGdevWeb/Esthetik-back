const db = require("../db/dbConfig");
const { QueryError } = require("./errorService");

const getArticles = () => {
  const query = "SELECT * FROM article";

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération des articles : ${error.message}`
          )
        );
      } else {
        resolve(results);
      }
    });
  });
};

const getArticleById = (articleId) => {
  const query = "SELECT * FROM article WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [articleId], (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération de l'article avec l'ID ${articleId} : ${error.message}`
          )
        );
      } else {
        resolve(results[0]);
      }
    });
  });
};

const createArticle = (
  title,
  content,
  rateId,
  publicationDate,
  author,
  image
) => {
  const query = `
  INSERT INTO article (title, content, rate_id, publication_date, author, image) 
  VALUES (?,?,?,?,?,?)
  `;
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [title, content, rateId, publicationDate, author, image],
      (error, result) => {
        if (error) {
          reject(
            new QueryError(
              `Erreur lors de la création de l'article : ${error.message}`
            )
          );
        } else {
          const insertedId = result.insertId;
          const findQuery = "SELECT * FROM article WHERE id = ?";
          db.query(findQuery, [insertedId], (findError, findResult) => {
            if (findError) {
              reject(
                new QueryError(
                  `Erreur lors de la récupération de l'article crée : ${findError.message}`
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

const deleteArticleById = (articleId) => {
  const query = "DELETE FROM article WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [articleId], (error, result) => {
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

const updateArticleById = (articleId, title, content, rateId, image) => {
  const query =
    "UPDATE article SET title = ?, content = ?, rate_id = ?, image = ? WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [title, content, rateId, image, articleId],
      (error, result) => {
        if (error) {
          reject(
            new QueryError(
              `Erreur lors de la mise à jour de l'article : ${error.message}`
            )
          );
        } else {
          const selectQuery = "SELECT * FROM article WHERE id = ?";
          db.query(selectQuery, [articleId], (error, rows) => {
            if (error) {
              reject(
                new QueryError(
                  `Erreur lors de la récupération de l'article mis à jour : ${error.message}`
                )
              );
            } else {
              resolve(rows[0]);
            }
          });
        }
      }
    );
  });
};

module.exports = {
  getArticles,
  getArticleById,
  createArticle,
  deleteArticleById,
  updateArticleById,
};
