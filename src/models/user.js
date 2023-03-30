const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {
    static init(sequelize, DataTypes) {
        return super.init({
            username: { type: DataTypes.STRING, allowNull: false, unique: true },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            password: { type: DataTypes.STRING, allowNull: false },
            is_admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
            created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
            updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
        }, { sequelize, modelName: 'User', tableName: 'users', underscored: true });
    }

    static associate(models) {
        this.belongsToMany(models.Movie, {
            through: models.UserMovieFavorite,
            foreignKey: 'userId',
            otherKey: 'movieId'
        });
    }
}

class UserMovieFavorite extends Model {
    static init(sequelize, DataTypes) {
        return super.init({}, { sequelize, modelName: 'UserMovieFavorite', tableName: 'user_film_favorites', underscored: true });
    }
}

module.exports = { User, UserMovieFavorite };