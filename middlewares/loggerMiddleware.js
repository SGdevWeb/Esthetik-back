const loggerMiddleware = (req, res, next) => {
  console.log("==== Requête reçue ====");
  console.log("Méthode :", req.method);
  console.log("URL :", req.originalUrl);
  console.log("Body :", req.body);
  console.log("Params :", req.params);
  console.log("Query :", req.query);
  console.log("File :", req.file);
  console.log("========================");
  next();
};

module.exports = loggerMiddleware;
