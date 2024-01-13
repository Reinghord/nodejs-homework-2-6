const multer = require("multer");
const path = require("path");

// Path to temprorary files from request
const tempDir = path.join(__dirname, "../", "tmp");

// Config to save files to tempDir and save original name
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Instanse with config
const upload = multer({ storage: multerConfig });

module.exports = upload;
