const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");
const Food = require("../models/Food");
const FoodImage = require("../models/FoodImage");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");

// @desc       Get foods
// @route      GET /api/foods
// @access     PUBLIC
const getFoods = asyncHandler(async (req, res) => {
    let { search, category, page } = req.query;

    console.log(search, category, page);
    if (!page) {
        page = 1;
    }
    const itemsPerPage = 4;
    let foods;
    let foodCount;

    if (search && category) {
        foodCount = await Food.findAndCountAll({
            where: {
                name: {
                    [Op.like]: "%" + search + "%",
                },
            },
            include: [
                {
                    model: Category,
                    where: { id: { [Op.eq]: category } },
                },
            ],
        });

        foods = await Food.findAll({
            where: {
                name: {
                    [Op.like]: "%" + search + "%",
                },
            },
            include: [
                {
                    model: FoodImage,
                },
                {
                    model: Category,
                    where: { id: { [Op.eq]: category } },
                },
            ],
            offset: (page - 1) * itemsPerPage,
            limit: itemsPerPage,
        });
    } else if (search && !category) {
        foodCount = await Food.findAndCountAll({
            where: {
                name: {
                    [Op.like]: "%" + search + "%",
                },
            },
        });
        foods = await Food.findAll({
            where: {
                name: {
                    [Op.like]: "%" + search + "%",
                },
            },
            include: [
                {
                    model: FoodImage,
                },
                {
                    model: Category,
                },
            ],
            offset: (page - 1) * itemsPerPage,
            limit: itemsPerPage,
        });
    } else if (!search && category) {
        foodCount = await Food.findAndCountAll({
            include: [
                {
                    model: Category,
                    where: { id: { [Op.eq]: category } },
                },
            ],
        });

        foods = await Food.findAll({
            include: [
                {
                    model: FoodImage,
                },
                {
                    model: Category,
                    where: { id: { [Op.eq]: category } },
                },
            ],
            offset: (page - 1) * itemsPerPage,
            limit: itemsPerPage,
        });
    } else {
        foodCount = await Food.findAndCountAll();

        foods = await Food.findAll({
            include: [
                {
                    model: FoodImage,
                },
                {
                    model: Category,
                },
            ],
            offset: (page - 1) * itemsPerPage,
            limit: itemsPerPage,
        });
    }

    const numberOfPage = Math.ceil(foodCount.count / itemsPerPage);

    if (!foods) {
        return res.status(404).json({ message: "food is not found" });
    }
    res.json({ docs: [...foods], currentPage: page, totalPages: numberOfPage });
});

// @desc       Get food by id
// @route      GET /api/foods/:id
// @access     PUBLIC
const getFood = asyncHandler(async (req, res) => {
    const food = await Food.findOne({
        where: {
            id: req.params.id,
        },
        include: [Category, FoodImage],
    });

    if (!food) {
        return res.status(404).json({ message: "food is not found" });
    }

    res.json(food);
});

// @desc       Get logged in user foods
// @route      GET /api/foods/me
// @access     PRIVATE
const getLoggedInUserFoods = asyncHandler(async (req, res) => {
    const foods = await Food.findAll({
        where: {
            userId: req.user.id,
        },
        include: [FoodImage],
    });

    res.json(foods);
});

// @desc       create food
// @route      POST /api/food/
// @access     PRIVATE
const createFood = asyncHandler(async (req, res) => {
    const { name, desc, stock, price, category } = req.body;

    const food = await Food.create({
        name,
        desc,
        stock,
        price,
        userId: req.user.id,
    });

    if (Array.isArray(category)) {
        category.map((categ) =>
            (async () => {
                let cat = await Category.findOne({
                    where: {
                        id: categ,
                    },
                });
                food.addCategory(cat);
            })()
        );
    } else {
        let cat = await Category.findOne({
            where: {
                id: category,
            },
        });
        food.addCategory(cat);
    }

    req.files.forEach((file) => {
        (async () => {
            try {
                await FoodImage.create({
                    image: "/" + file.destination + file.filename,
                    foodId: food.id,
                });
            } catch (error) {
                console.log(error);
            }
        })();
    });

    res.json(food);
});

// @desc       update food by id
// @route      PUT /api/food/:id
// @access     PRIVATE
const updateFood = asyncHandler(async (req, res) => {
    const { name, desc, stock, price, category } = req.body;

    const food = await Food.findOne({
        where: {
            id: req.params.id,
            userId: req.user.id,
        },
    });

    if (!food) {
        return res.status(404).json({
            message: "Food not found or you are not owner of this food",
        });
    }

    if (name) {
        food.name = name;
    }

    if (desc) {
        food.desc = desc;
    }

    if (Number(stock)) {
        food.stock = Number(stock);
    }

    if (Number(price)) {
        food.price = Number(price);
    }

    if (req.files && req.files.length > 0) {
        const foodImages = await FoodImage.findAll({
            where: {
                foodId: req.params.id,
            },
        });

        foodImages.forEach((foodImage) => {
            (async () => {
                console.log(path.join(__dirname, "../", foodImage.image));
                fs.unlinkSync(path.join(__dirname, "../", foodImage.image));
                await foodImage.destroy();
            })();
        });

        req.files.forEach((file) => {
            (async () => {
                try {
                    await FoodImage.create({
                        image: "/" + file.destination + file.filename,
                        foodId: food.id,
                    });
                } catch (error) {
                    console.log(error);
                }
            })();
        });
    }

    await food.save();

    res.json(food);
});

// @desc       delete food by id
// @route      DELETE /api/food/:id
// @access     PRIVATE
const deleteFood = asyncHandler(async (req, res) => {
    const food = await Food.findOne({
        where: {
            id: req.params.id,
            userId: req.user.id,
        },
    });

    if (!food) {
        return res.status(401).json("Unauthorized");
    }

    const foodImages = await FoodImage.findAll({
        where: {
            foodId: food.id,
        },
    });

    await food.destroy();

    foodImages.forEach((foodImage) => {
        (async () => {
            fs.unlinkSync(path.join(__dirname, "../", foodImage.image));
            await foodImage.destroy();
        })();
    });

    res.json({ message: "Remove successfully" });
});

// @desc       Get foods
// @route      GET /api/foods
// @access     PUBLIC
const createCategory = asyncHandler(async (req, res) => {
    const category = await Category.create({
        name: req.body.name,
    });

    res.json(category);
});

module.exports = {
    getFoods,
    getFood,
    getLoggedInUserFoods,
    createFood,
    updateFood,
    deleteFood,
    createCategory,
};
