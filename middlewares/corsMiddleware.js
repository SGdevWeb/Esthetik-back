const cors = require("cors");

const corsOptions = {
  origin: ["https://eclatdebeauté.fr", "http://localhost:3000"],
  methods: ["GET"],
  optionsSuccessStatus: 200,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
