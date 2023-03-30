const { Movie, UserMovieFavorite } = require('../models/index');

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching movies' });
    }
};

exports.addMovie = async (req, res) => {
    try {
        const { title, description, releaseDate, director } = req.body;
        const movie = await Movie.create({ title, description, releaseDate, director });
        res.status(201).json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding movie' });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, releaseDate, director } = req.body;

        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        movie.title = title;
        movie.description = description;
        movie.releaseDate = releaseDate;
        movie.director = director;

        await movie.save();
        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating movie' });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        await movie.destroy();
        res.json({ message: 'Movie deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting movie' });
    }
};

exports.addFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const existingFavorite = await UserMovieFavorite.findOne({
            where: { userId: userId, movieId: id }
        });

        if (existingFavorite) {
            return res.status(400).json({ message: 'Movie is already in favorites' });
        }

        await UserMovieFavorite.create({ userId, movieId: id });
        res.json({ message: 'Movie added to favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding favorite' });
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const favorite = await UserMovieFavorite.findOne({
            where: { userId: userId, movieId: id }
        });

        if (!favorite) {
            return res.status(400).json({ message: 'Movie is not in favorites' });
        }

        await favorite.destroy();
        res.json({ message: 'Movie removed from favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing favorite' });
    }
};