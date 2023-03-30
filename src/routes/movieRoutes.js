const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', movieController.getMovies);
router.post('/', isAdmin, movieController.addMovie);
router.put('/:id', isAdmin, movieController.updateMovie);
router.delete('/:id', isAdmin, movieController.deleteMovie);

router.post('/favorites/:id', movieController.addFavorite);
router.delete('/favorites/:id', movieController.removeFavorite);

module.exports = router;