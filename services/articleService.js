const db = require("../db/dbConfig");

const getArticles = () => {
  const query = "SELECT * FROM article";

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

const getArticleById = (articleId) => {
  const query = "SELECT * FROM article WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [articleId], (error, results) => {
      if (error) {
        reject(error);
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
