const express = require('express');
const router = express.Router();
const path = require('path');
const UserController = require('../controllers/UserController');
const getUploadMiddleware = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const ImageController = require('../controllers/ImageController');

const uploadUserImage = getUploadMiddleware('users');

// Register & Login user
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Update user info

router.put('/update', authMiddleware, uploadUserImage.single('profile_picture'), UserController.update);

// Get user info (Image,etc)
router.get('/image/:filename', authMiddleware, ImageController.serveUserImage);


module.exports = router;
