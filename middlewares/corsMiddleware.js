const cors = require("cors");

const corsOptions = {
  origin: ["https://eclatdebeauté.fr", "http://localhost:3000"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
