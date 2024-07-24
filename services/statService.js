const matomoDb = require("../db/matomoDb");
const { QueryError } = require("./errorService");

const getDailyVisitors = () => {
  const query = `
    SELECT 
      DATE(visit_last_action_time) as date, 
      COUNT(*) as visits
    FROM 
      matomo_log_visit
    WHERE 
      visit_last_action_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY 
      DATE(visit_last_action_time)
    ORDER BY 
      date DESC;
  `;

  return new Promise((resolve, reject) => {
    matomoDb.query(query, (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération du nombre de visiteurs par jour : ${error.message}`
          )
        );
      } else {
        results.forEach((row) => {
          row.date = format(new Date(row.date), "yyyy-MM-dd");
        });
        resolve(results);
      }
    });
  });
};

const getMostVisitedPage = () => {
  const query = `
    SELECT 
      name as page_name, 
      COUNT(*) as page_views 
    FROM 
      matomo_log_action 
    JOIN 
      matomo_log_link_visit_action ON matomo_log_action.idaction = matomo_log_link_visit_action.idaction_url 
    WHERE 
      type = 1 AND name LIKE 'xn--clatdebeaut-99al.fr%'
    GROUP BY 
      name 
    ORDER BY 
      page_views DESC 
    LIMIT 10;
  `;

  return new Promise((resolve, reject) => {
    matomoDb.query(query, (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération des pages les plus visitées : ${error.message}`
          )
        );
      } else {
        resolve(results);
      }
    });
  });
};

const getAverageTime = () => {
  const query = `
    SELECT 
      DATE(visit_last_action_time) as date, 
      AVG(visit_total_time) as avg_time
    FROM 
      matomo_log_visit
    WHERE 
      visit_last_action_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY 
      DATE(visit_last_action_time)
    ORDER BY 
      date;
  `;

  return new Promise((resolve, reject) => {
    matomoDb.query(query, (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération du temps moyen passé sur le site : ${error.message}`
          )
        );
      } else {
        resolve(results);
      }
    });
  });
};

const getBounceRate = () => {
  const query = `
    SELECT 
      DATE(visit_last_action_time) as date,
      (COUNT(CASE WHEN visit_total_actions = 1 THEN 1 END) * 100.0 / COUNT(*)) as bounce_rate
    FROM 
      matomo_log_visit
    WHERE 
      visit_last_action_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY 
      DATE(visit_last_action_time)
    ORDER BY 
      date;
  `;

  return new Promise((resolve, reject) => {
    matomoDb.query(query, (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération du taux de rebond : ${error.message}`
          )
        );
      } else {
        results.forEach((row) => {
          row.date = format(new Date(row.date), "yyyy-MM-dd");
        });
        resolve(results);
      }
    });
  });
};

module.exports = {
  getDailyVisitors,
  getMostVisitedPage,
  getAverageTime,
  getBounceRate,
};
