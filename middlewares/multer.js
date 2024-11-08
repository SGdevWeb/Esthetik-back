const multer = require("multer");
const path = require("path");
const { UnsupportedFileTypeError } = require("../services/errorService");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now();
    const sanitizedOriginalName = file.originalname.replace(/\s+/g, "-");
    const newFileName = `${uniquePrefix}-${sanitizedOriginalName}`;
    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new UnsupportedFileTypeError(
        "Type de fichier non supporté. Seules les images sont autorisées !",
        false
      )
    );
  }
};

const limits = {
  fileSize: 10 * 1024 * 1024,
};

const upload = multer({ storage, fileFilter, limits }).fields([
  { name: "image", maxCount: 1 },
  { name: "title" },
  { name: "content" },
  { name: "rateId" },
  { name: "publicationDate" },
  { name: "author" },
  { name: "imageCategory" },
]);

const uploadMiddleware = async (req, res, next) => {
  const handleOldFile = () => {
    const oldFileName = req.body.oldImage;
    if (oldFileName) {
      const oldFilePath = path.join(__dirname, "../uploads", oldFileName);
      if (fs.existsSync(oldFilePath)) {
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error(
              "Erreur lors de la suppression de l'ancienne image :",
              err
            );
          } else {
            console.log("Ancien fichier supprimé :", oldFilePath);
          }
        });
      }
    }
  };

  try {
    await new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
          reject({ status: 400, message: `Erreur Multer: ${err.message}` });
        } else if (err instanceof UnsupportedFileTypeError) {
          reject({ status: 400, message: err.message });
        } else if (err) {
          reject({ status: 500, message: err.message });
        } else {
          resolve();
        }
      });
    });

    handleOldFile();
    next();
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = uploadMiddleware;
