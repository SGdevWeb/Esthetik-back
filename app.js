const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const path = require("path");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../Esthetik-front/build")));

const pathsToRedirect = ["/prestations", "/prestations/*", "/actu", "/actu/*"];

pathsToRedirect.forEach((pathToRedirect) => {
  app.get(pathToRedirect, function (req, res) {
    res.sendFile(path.join(__dirname, "../Esthetik-front/build", "index.html"));
  });
});

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

const articleRoutes = require("./routes/articleRoutes");
app.use("/api", articleRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api", adminRoutes);

module.exports = app;
