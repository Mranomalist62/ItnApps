const multer = require('multer');
const path = require('path');
const fs = require('fs');

function getUploadMiddleware(folderName) {
  const baseDir = path.join(__dirname, '..', 'uploads', folderName);

  // Ensure the folder exists
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, baseDir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = `${folderName.slice(0, -1)}_${Date.now()}${ext}`;
      cb(null, uniqueName);
    }
  });

  return multer({ storage });
}

module.exports = getUploadMiddleware;