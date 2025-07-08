const express = require('express');
const router = express.Router();
const RetreatController = require('../controllers/RetreatController');
const authMiddleware = require('../middlewares/authMiddleware');
const ImageController = require('../controllers/ImageController');
const getUploadMiddleware = require('../middlewares/uploadMiddleware');

const uploadRetreatImage = getUploadMiddleware('retreats');

// GET
router.get('/random', RetreatController.getRandomRetreats); // For homepage
router.get('/search', RetreatController.searchRetreats);    // With query params
router.get('/detail/:id', RetreatController.getRetreatsById);    // With id params
router.get('/all', authMiddleware.withAdmin, RetreatController.getAllRetreats); // Admin

// POST
router.post(
  '/create',
  authMiddleware.withAdmin,
  uploadRetreatImage.array('images', 3),
  RetreatController.createRetreat
);

router.post(
  "/save/:retreatId", 
  authMiddleware, 
  RetreatController.saveRetreat
);


// PUT
router.put(
  '/:id',
  authMiddleware.withAdmin,
  uploadRetreatImage.array('images', 3),
  RetreatController.updateRetreat
);

router.get(
  "/save", 
  authMiddleware, 
  RetreatController.getSavedRetreats
);


// DELETE
router.delete(
  '/:id',
  authMiddleware.withAdmin,
  RetreatController.deleteRetreat
);
router.delete(
  "/save/:retreatId", 
  authMiddleware, 
  RetreatController.unsaveRetreat
);


//Image

router.get('/image/:filename', ImageController.serveRetreatImage);


module.exports = router;