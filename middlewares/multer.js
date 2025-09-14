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

const upload = multer({ storage, fileFilter, limits }).single("image");

const uploadMiddleware = async (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Erreur Multer: ${err.message}` });
    } else if (err instanceof UnsupportedFileTypeError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }

    // suppression de l'ancien fichier si nécessaire
    if (req.body.oldImage) {
      const oldFilePath = path.join(__dirname, "../uploads", req.body.oldImage);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }

    next();
  });
};

module.exports = uploadMiddleware;
