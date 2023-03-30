const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Movie extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            releaseDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            director: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, { sequelize, modelName: 'Movie' });
    }

    static associate(models) {
        this.belongsToMany(models.User, {
            through: models.UserMovieFavorite,
            foreignKey: 'movieId',
            otherKey: 'userId'
        });
    }
}

module.exports = Movie;
