const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: "mysql",
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been establish successfully. ");
    } catch (error) {
        console.log("Unable connect to the database");
    }
};

module.exports = { sequelize, connectDB };
