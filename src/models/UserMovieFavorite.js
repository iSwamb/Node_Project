const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const UserMovieFavorite = sequelize.define('UserMovieFavorite', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    movieId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'user_movie_favorites',
});

module.exports = UserMovieFavorite;