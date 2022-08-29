const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

const {
    getMyOrders,
    createOrder,
    deleteOrder,
} = require("../controllers/orderController");

router.get("/myOrders", protect, getMyOrders);
router.post("/", protect, createOrder);
router.delete("/:id", protect, deleteOrder);

module.exports = router;
