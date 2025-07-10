"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Ticket extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Ticket.belongsTo(models.Place, { foreignKey: "placeId" });
            Ticket.hasMany(models.Order, { foreignKey: "ticketId" });
        }
    }
    Ticket.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            stock: DataTypes.INTEGER,
            validDate: DataTypes.DATE,
            placeId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Ticket",
        }
    );
    return Ticket;
};
