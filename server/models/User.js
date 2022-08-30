const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Food = require("./Food");
const Address = require("./Address");
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

        bio: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        profilePicture: {
            type: DataTypes.STRING,
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

User.hasMany(Address);
Address.belongsTo(User);

(async () => {
    await sequelize.sync();
    console.log("User");
})();

module.exports = User;
