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

module.exports = {
  getArticles,
  getArticleById,
};
