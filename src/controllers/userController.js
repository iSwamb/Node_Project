const { User, Movie } = require('../models/index');
const { validationResult } = require('express-validator');

exports.addFavoriteMovie = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { movieId } = req.body;
    const movie = await Movie.findByPk(movieId);

    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    try {
        const user = await User.findByPk(req.user.id, { include: { model: Movie, as: 'movies' } });
        if (user.movies.some(m => m.id === movieId)) {
            return res.status(400).json({ message: 'Movie already in favorites' });
        }

        await user.addMovie(movie);
        res.status(200).json({ message: 'Movie added to favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding movie to favorites', error: error.message });
    }
};

exports.removeFavoriteMovie = async (req, res) => {
    const { movieId } = req.params;
    const movie = await Movie.findByPk(movieId);

    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    try {
        const user = await User.findByPk(req.user.id, { include: { model: Movie, as: 'movies' } });
        if (!user.movies.some(m => m.id === movieId)) {
            return res.status(400).json({ message: 'Movie not in favorites' });
        }

        await user.removeMovie(movie);
        res.status(200).json({ message: 'Movie removed from favorites' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing movie from favorites', error: error.message });
    }
};

exports.getFavoriteMovies = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, { include: { model: Movie, as: 'movies' } });
        res.status(200).json({ movies: user.movies });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorite movies', error: error.message });
    }
};