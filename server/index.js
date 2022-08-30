const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const { sequelize } = require("./config/db");

const PORT = process.env.PORT || 8000;

(async () => {
    await sequelize.authenticate();
    console.log("Connection has been establish successfully. ");
})();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));
console.log(path.join(__dirname, "../", "client", "build"));

if (process.env.NODE_ENV == "production") {
    console.log(path.join(__dirname, "../"));
    app.use(express.static(path.join(__dirname, "../", "client", "build")));

    app.get("/", function (req, res) {
        res.sendFile(
            path.join(__dirname, "../", "client", "build", "index.html")
        );
    });
}

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/foods", require("./routes/foodRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
