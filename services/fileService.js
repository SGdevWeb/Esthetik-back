const path = require("path");

const getFilePath = (filename) => {
  return path.join(__dirname, "../uploads", filename);
};

module.exports = {
  getFilePath,
};
