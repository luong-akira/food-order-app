const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { protect } = require("../middlewares/authMiddleware");
const {
    getUser,
    updateUser,
    addAddress,
    updateAddress,
    deleteAddress,
    getAllAddrresses,
} = require("../controllers/userController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/users/");
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

router.put("/", protect, upload.single("profileImage"), updateUser);
router.get("/address", protect, getAllAddrresses);
router.get("/:id", getUser);
router.post("/address", protect, addAddress);
router.put("/address/:id", protect, updateAddress);
router.delete("/address/:id", protect, deleteAddress);

module.exports = router;
