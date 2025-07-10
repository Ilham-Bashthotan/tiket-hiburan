"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Place extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Place.belongsTo(models.Category, { foreignKey: "categoryId" });
            Place.hasMany(models.Ticket, { foreignKey: "placeId" });
        }
    }
    Place.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            address: DataTypes.STRING,
            imageUrl: DataTypes.STRING,
            categoryId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Place",
        }
    );
    return Place;
};
