const db = require("../db/dbConfig");

const getSlots = () => {
  const query = "SELECT * FROM slot ORDER BY date";

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        // conversion de la date en chaîne de caractères
        results.forEach((row) => {
          row.date = row.date.toISOString().split("T")[0];
        });
        resolve(results);
      }
    });
  });
};

const getSlotById = (slotId) => {
  const query = "SELECT * FROM slot WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [slotId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length === 0) {
          resolve(null);
        } else {
          // conversion de la date en chaîne de caractères
          results[0].date = results[0].date.toISOString().split("T")[0];
          resolve(results[0]);
        }
      }
    });
  });
};

const getAvailableSlots = () => {
  const query =
    "SELECT * FROM slot WHERE is_booked = 0 ORDER BY date, start_time";

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        // conversion de la date en chaîne de caractères
        results.forEach((row) => {
          row.date = row.date.toISOString().split("T")[0];
        });
        resolve(results);
      }
    });
  });
};

const getSlotsWithDetails = () => {
  const query = `
  SELECT  slot.*, 
          appointment.firstname, 
          appointment.lastname, 
          appointment.email, 
          service.title, 
          service.price,
          rate.name AS type_de_prestation
  FROM slot 
  LEFT JOIN appointment ON slot.appointment_id = appointment.id 
  LEFT JOIN appointment_service ON appointment.id = appointment_service.appointment_id 
  LEFT JOIN service ON appointment_service.service_id = service.id
  LEFT JOIN rate ON service.rate_id = rate.id;
`;

  return new Promise((resolve, reject) => {
    db.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        results.forEach((row) => {
          row.date = row.date.toISOString().split("T")[0];
        });
        resolve(results);
      }
    });
  });
};

const addSlots = (slots) => {
  const query = "INSERT INTO slot (date, start_time, end_time) VALUES ?";

  const decomposeSlot = (slot) => {
    const startHour = parseInt(slot.startTime.split(":")[0], 10);
    const endHour = parseInt(slot.endTime.split(":")[0], 10);
    const oneHourSlots = [];

    for (let i = startHour; i < endHour; i++) {
      oneHourSlots.push({
        date: slot.date,
        startTime: `${i}:00`,
        endTime: `${i + 1}:00`,
      });
    }
    return oneHourSlots;
  };

  const allOneHourSlots = [];
  slots.forEach((slot) => {
    const decomposedSlots = decomposeSlot(slot);
    allOneHourSlots.push(...decomposedSlots);
  });

  const values = allOneHourSlots.map((slot) => [
    slot.date,
    slot.startTime,
    slot.endTime,
  ]);

  console.log(values);

  return new Promise((resolve, reject) => {
    db.query(query, [values], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const updateSlotToBooked = (slotId) => {
  const query = "UPDATE slot SET is_booked = 1 WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [slotId], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const updateSlotWithAppointmentId = (slotId, appointmentId) => {
  const query = "UPDATE slot SET appointment_id = ? WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [appointmentId, slotId], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.affectedRows);
      }
    });
  });
};

const deleteSlotById = (slotId) => {
  const query = "DELETE FROM slot WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(query, [slotId], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.affectedRows);
      }
    });
  });
};

const updateSlotById = (slotId, updatedSlot) => {
  const query = "UPDATE slot SET start_time = ?, end_time = ? WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.query(
      query,
      [updatedSlot.start_time, updatedSlot.end_time, slotId],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows);
        }
      }
    );
  });
};

module.exports = {
  getSlots,
  addSlots,
  getSlotById,
  getSlotsWithDetails,
  updateSlotToBooked,
  getAvailableSlots,
  updateSlotWithAppointmentId,
  deleteSlotById,
  updateSlotById,
};
