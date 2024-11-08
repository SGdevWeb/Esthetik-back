const path = require("path");
const fileService = require("../services/fileService");

const getFile = (req, res) => {
  const fileName = req.params.filename;
  const filePath = fileService.getFilePath(fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Erreur lors de l'envoi du fichier : ", err);
      return res.status(404).json({ message: "Fichier non trouvé" });
    }
  });
};

module.exports = { getFile };
