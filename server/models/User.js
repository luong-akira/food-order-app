const { Sequelize, DataTypes } = require("sequelize");
const Food = require("./Food");
const sequelize = new Sequelize("mysql://root:luong@localhost:3306/bookingapp");
const Order = require("./Order");

const User = sequelize.define(
    "user",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        profilePicture: {
            type: DataTypes.STRING,
        },

        phoneNumber: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },

        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);

User.hasMany(Food);
Food.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

(async () => {
    await sequelize.sync();
    console.log("User");
})();

module.exports = User;
