const matomoDb = require("../db/matomoDb");
const { QueryError } = require("./errorService");

const getVisitors = () => {
  const query = `
    SELECT DATE(visit_last_action_time) as date, COUNT(*) as visits
    FROM matomo_log_visit
    WHERE visit_last_action_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY DATE(visit_last_action_time)
    ORDER BY date DESC;
  `;

  return new Promise((resolve, reject) => {
    matomoDb.query(query, (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération des stats visiteurs : ${error.message}`
          )
        );
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = {
  getVisitors,
};
