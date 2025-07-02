const express = require('express');
const router = express.Router();
const RetreatController = require("../controllers/RetreatController")
const authMiddleware = require("../middlewares/authMiddleware")
const uploadRetreatImage = getUploadMiddleware('retreats');
const authMiddleware = require('../middlewares/authMiddleware');

//get
router.get('/random', RetreatController.getRandomRetreats);   // For homepage
router.get('/all', authMiddleware, RetreatController.getAllRetreats); // Admin
router.get('/search', RetreatController.searchRetreats); // With query params

//post


router.post('/create', authMiddleware.withAdmin, uploadRetreatImage.array('images', 3), RetreatController.createRetreat);

//put
router.put('/:id', authMiddleware, uploadRetreatImage.array('images', 3), RetreatController.updateRetreat);

//delete
router.delete('/:id', authMiddleware, RetreatController.deleteRetreat);

