const path = require('path');
const fs = require('fs');

const serveImage = (folder) => {
  return (req, res) => {
    const { filename } = req.params;

    // Basic filename validation
    if (!filename || filename.includes('..')) {
      return res.status(400).json({ error: 'Invalid filename' });
    }

    const filePath = path.join(__dirname, '..', 'uploads', folder, filename);

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: 'Image not found' });
      }

      res.sendFile(filePath);
    });
  };
};

module.exports = {
  serveUserImage: serveImage('users'),
  serveRetreatImage: serveImage('retreats'),
  serveDestinationImage: serveImage('destinations'),
};