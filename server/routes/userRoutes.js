const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { protect } = require("../middlewares/authMiddleware");
const { getUser, updateUser } = require("../controllers/userController");

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

router.get("/:id", getUser);
router.put("/", protect, upload.single("profileImage"), updateUser);

module.exports = router;
