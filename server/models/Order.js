const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:luong@localhost:3306/bookingapp");

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
    },
    {
        timestamps: true,
    }
);

(async () => {
    await sequelize.sync();
    console.log("Order");
})();

module.exports = Order;
