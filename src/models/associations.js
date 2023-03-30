const User = require('./User');
const Movie = require('./Movie');

Movie.belongsToMany(User, { through: 'UserMovieFavorite', foreignKey: 'movieId' });
User.belongsToMany(Movie, { through: 'UserMovieFavorite', foreignKey: 'userId' });
