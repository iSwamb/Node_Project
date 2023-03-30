const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user');
const Movie = require('./Movie');
const { UserMovieFavorite } = require('./user');

const models = {
    User: User.init(sequelize, Sequelize),
    Movie: Movie.init(sequelize, Sequelize),
    UserMovieFavorite: UserMovieFavorite.init(sequelize, Sequelize),
};

Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

module.exports = models;