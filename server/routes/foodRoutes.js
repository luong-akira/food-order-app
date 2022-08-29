const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const {
    getFoods,
    getFood,
    getLoggedInUserFoods,
    createFood,
    updateFood,
    deleteFood,
    createCategory,
} = require("../controllers/foodController");
const { protect } = require("../middlewares/authMiddleware");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/foods/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                "-" +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });
// const upload = multer({ dest: "uploads/foods/" });

router.get("/", getFoods);
router.get("/me", protect, getLoggedInUserFoods);
router.get("/:id", getFood);
router.post("/", upload.array("foods", 5), protect, createFood);
router.post("/createCategory", createCategory);
router.put("/:id", upload.array("foods", 5), protect, updateFood);
router.delete("/:id", protect, deleteFood);

module.exports = router;
