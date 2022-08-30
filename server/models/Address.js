const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");

const Address = sequelize.define("adress", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

(async () => {
    await sequelize.sync();
    console.log("Address");
})();

module.exports = Address;
