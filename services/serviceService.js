const db = require("../db/dbConfig");
const { QueryError } = require("./errorService");

const getServices = () => {
  const query = "SELECT * FROM service WHERE is_deleted = FALSE";

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération des prestations : ${error.message}`
          )
        );
      } else {
        resolve(results);
      }
    });
  });
};

const getServicesByRate = async (rateId) => {
  const query = "SELECT * FROM service WHERE rate_id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [rateId], (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération des prestations par le nom du tarif : ${error.message}`
          )
        );
      } else {
        resolve(results);
      }
    });
  });
};

const getServicesWithRates = () => {
  const query = `
        SELECT
          r.id AS rate_id,
          r.name AS rate_name,
          s.id AS service_id,
          s.title AS service_title,
          s.price AS service_price
        FROM rate r
        JOIN service s ON r.id = s.rate_id
    `;

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération des prestations avec les tarifs : ${error.message}`
          )
        );
      } else {
        resolve(results);
      }
    });
  });
};

const getServiceById = (serviceId) => {
  const query = "SELECT * FROM service WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [serviceId], (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la récupération de la prestation : ${error.message}`
          )
        );
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          resolve(results[0]);
        }
      }
    });
  });
};

const addService = (title, price, rate_id) => {
  const query = "INSERT INTO service (title, price, rate_id) VALUES (?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(query, [title, price, rate_id], (error, results) => {
      if (error) {
        reject(
          new QueryError(`Erreur lors de l'ajout du service : ${error.message}`)
        );
      } else {
        const newServiceId = results.insertId;
        resolve({ id: newServiceId, title, price, rate_id });
      }
    });
  });
};

const deleteServiceById = (serviceId) => {
  const query = "DELETE FROM service WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [serviceId], (error, result) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la suppression de la prestation : ${error.message}`
          )
        );
      } else {
        resolve(result.affectedRows);
      }
    });
  });
};

const updateService = (serviceId, newData) => {
  const { title, price, rate_id } = newData;
  const query =
    "UPDATE service SET title = ?, price = ?, rate_id = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [title, price, rate_id, serviceId], (error, results) => {
      if (error) {
        reject(
          new QueryError(
            `Erreur lors de la mise à jour de la prestation avec l'ID ${serviceId} : ${error.message}`
          )
        );
      } else {
        resolve({ id: serviceId, title, price, rate_id });
      }
    });
  });
};

module.exports = {
  getServicesWithRates,
  getServices,
  getServicesByRate,
  getServiceById,
  addService,
  deleteServiceById,
  updateService,
};
