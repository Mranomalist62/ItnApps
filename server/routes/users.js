const express = require('express');
const router = express.Router();
const path = require('path');
const ImageController = require('../controllers/ImageController');
const AuthController = require('../controllers/AuthControllers');
const UserController = require('../controllers/UserControllers');
const getUploadMiddleware = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const uploadUserImage = getUploadMiddleware('users');

// Register & Login user
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/validate', AuthController.validate);

// All User dashboard action
// Update user info
router.put('/update/:id', authMiddleware, uploadUserImage.single('profile_picture'), UserController.update);

// Get user info (Image,etc)
router.get('/image/:filename', authMiddleware, ImageController.serveUserImage);


module.exports = router;
