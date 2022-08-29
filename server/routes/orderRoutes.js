const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

const {
    getMyOrders,
    getOrderList,
    createOrder,
    deleteOrder,
    toggleIsDelivered,
} = require("../controllers/orderController");

router.get("/myOrders", protect, getMyOrders);
router.get("/orderList", protect, getOrderList);
router.post("/", protect, createOrder);
router.post("/:id", protect, toggleIsDelivered);
router.delete("/:id", protect, deleteOrder);

module.exports = router;
