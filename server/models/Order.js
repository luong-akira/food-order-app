const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Order = sequelize.define(
    "order",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isDelivered: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

(async () => {
    await sequelize.sync({ alter: true });
    console.log("Order");
})();

module.exports = Order;
