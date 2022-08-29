const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("mysql://root:luong@localhost:3306/bookingapp");

const Category = sequelize.define(
    "category",
    {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

(async () => {
    await sequelize.sync();
    console.log("Category");
})();

module.exports = Category;
