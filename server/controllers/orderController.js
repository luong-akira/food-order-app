const asyncHandler = require("express-async-handler");
const Food = require("../models/Food");
const Order = require("../models/Order");

// @desc       Get all my orders
// @route      GET /api/orders/myOrders
// @access     PRIVATE
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.findAll({
        where: {
            userId: req.user.id,
        },
        include: Food,
    });

    res.json(orders);
});

// @desc       Create an order
// @route      POST /api/orders
// @access     PRIVATE
const createOrder = asyncHandler(async (req, res) => {
    const { quantity, foodId } = req.body;

    const food = await Food.findOne({
        where: {
            id: foodId,
        },
    });

    if (!food) {
        return res.status(404).json({ message: "Food not found" });
    }

    if (quantity > food.stock) {
        return res.status(400).json({ message: "Exceeds the stock" });
    }

    if (food && food.userId == req.user.id) {
        return res.status(401).json({ message: "You own this food" });
    }

    const order = await Order.create({
        quantity,
        userId: req.user.id,
        foodId,
        total: quantity * food.price,
    });

    food.stock -= quantity;
    await food.save();

    res.json(order);
});

// @desc       Get foods
// @route      DELETE /api/orders/:id
// @access     PRIVATE
const deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findOne({
        where: {
            id: req.params.id,
            userId: req.user.id,
        },
    });

    if (!order) {
        return res.status(404).json({ message: "Order is not found" });
    }

    const food = await Food.findOne({
        where: {
            id: order.foodId,
        },
    });

    if (!food) {
        return res.status(404).json({ message: "food is not found" });
    }

    if (order.isDelivered == true) {
        return res.status(404).json({
            message:
                "This order is already delivered you can not cancel this order",
        });
    }

    food.stock += order.quantity;
    await food.save();

    await order.destroy();

    res.json(food);
});

module.exports = { getMyOrders, createOrder, deleteOrder };
