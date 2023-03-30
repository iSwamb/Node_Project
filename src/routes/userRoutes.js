const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post('/favorites', isAuthenticated, [
    body('movieId').isInt().withMessage('Valid movie ID is required')
], userController.addFavoriteMovie);

router.delete('/favorites/:movieId', isAuthenticated, [
    param('movieId').isInt().withMessage('Valid movie ID is required')
], userController.removeFavoriteMovie);

router.get('/favorites', isAuthenticated, userController.getFavoriteMovies);

module.exports = router;