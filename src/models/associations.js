const { User, Movie, UserMovieFavorite } = require('./index');

Movie.belongsToMany(User, { through: 'UserMovieFavorite', foreignKey: 'movieId' });
User.belongsToMany(Movie, { through: 'UserMovieFavorite', foreignKey: 'userId' });
