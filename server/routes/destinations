const express = require('express');
const router = express.Router();
const DestinationController = require('../controllers/destinationController');
const authMiddleware = require('../middlewares/authMiddleware');
const getUploadMiddleware = require('../middlewares/uploadMiddleware');

const uploadDestinationImage = getUploadMiddleware('destinations');

// GET — public access if needed
router.get('/all', DestinationController.getAllDestinations);
router.get('/:id', DestinationController.getDestinationById); // optional if needed

// POST — admin only
router.post(
  '/create',
  authMiddleware.withAdmin,
  uploadDestinationImage.single('main_image_url'),
  DestinationController.create
);

// PUT — admin only
router.put(
  '/:id',
  authMiddleware.withAdmin,
  uploadDestinationImage.single('main_image_url'),
  DestinationController.update
);

// DELETE — admin only
router.delete(
  '/:id',
  authMiddleware.withAdmin,
  DestinationController.delete
);

module.exports = router;