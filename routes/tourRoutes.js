const express = require('express');
const tourController = require('../controllers/tourController');

//ROUTES
const router = express.Router();

router.param('id', tourController.checkID);

//middleware to check if request body contains name and price

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour);
router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;
