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

const addSlots = async (slots) => {
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

module.exports = {
  getSlots,
  addSlots,
};
