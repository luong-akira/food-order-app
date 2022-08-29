const express = require("express");
const app = express();
require("dotenv").config();
const { connectDB } = require("./config/db");

const PORT = process.env.PORT || 8000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static("uploads"));

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
