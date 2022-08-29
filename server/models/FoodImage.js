const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:luong@localhost:3306/bookingapp");

const FoodImage = sequelize.define(
    "foodImage",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

(async () => {
    await sequelize.sync();
    console.log("Food Images");
})();

module.exports = FoodImage;
