const express = require('express');
const router = express.Router();
const path = require('path');
const UserController = require('../controllers/UserController');
const upload = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

// Register & Login
router.post('/register', UserController.register);
router.post('/login', UserController.login);

// Update user info
router.put('/update', authMiddleware, upload.single('profile_picture'), UserController.update);

module.exports = router;