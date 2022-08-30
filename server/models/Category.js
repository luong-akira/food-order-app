const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

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
    // await Category.bulkCreate([
    //     { name: "pizza" },
    //     { name: "fried chicken" },
    //     { name: "hamburger" },
    //     { name: "other" },
    // ]);
})();

module.exports = Category;
