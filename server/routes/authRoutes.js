const express = require("express");
const router = express.Router();

const {
    register,
    login,
    changePassword,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.put("/changePassword", protect, changePassword);

module.exports = router;
