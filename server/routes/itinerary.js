const express = require('express');
const router = express.Router();
const ItineraryController = require('../controllers/ItineraryController');
const authMiddleware = require('../middlewares/authMiddleware');

// In routes/itinerary.js or similar
router.get("/check", authMiddleware, ItineraryController.checkUserItinerary);
router.post("/create", authMiddleware, ItineraryController.create);
router.put("/updateId", authMiddleware, ItineraryController.updateRetreatId);
router.delete('/:id', authMiddleware, ItineraryController.delete);

module.exports = router;
