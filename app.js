const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const db = require("./db/dbConfig");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const rateRoutes = require("./routes/rateRoutes");
app.use("/api", rateRoutes);

const serviceRoutes = require("./routes/serviceRoutes");
app.use("/api", serviceRoutes);

const locationRoutes = require("./routes/locationRoutes");
app.use("/api", locationRoutes);

const discountRoutes = require("./routes/discountRoutes");
app.use("/api", discountRoutes);

const promotionRoutes = require("./routes/promotionRoutes");
app.use("/api", promotionRoutes);

const packageRoutes = require("./routes/packageRoutes");
app.use("/api", packageRoutes);

module.exports = app;
