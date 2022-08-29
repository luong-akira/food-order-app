const { Sequelize, DataTypes } = require("sequelize");
const FoodImage = require("./FoodImage");
const Category = require("./Category");
const Order = require("./Order");
const sequelize = new Sequelize("mysql://root:luong@localhost:3306/bookingapp");

const Food = sequelize.define(
    "food",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        timestamps: true,
    }
);

Food.hasMany(FoodImage);
FoodImage.belongsTo(Food);

Category.belongsToMany(Food, { through: "foodCategory" });
Food.belongsToMany(Category, { through: "foodCategory" });

Food.hasMany(Order);
Order.belongsTo(Food);

(async () => {
    await sequelize.sync();
    console.log("Food");
})();

module.exports = Food;
