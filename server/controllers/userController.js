const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");

// @desc       Get user
// @route      POST /api/users/:id
// @access     PUBLIC
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id,
        },
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        phoneNumber: user.phoneNumber,
        address: user.address,
    });
});

// @desc       update user
// @route      PUT /api/users/:id
// @access     PRIVATE
const updateUser = asyncHandler(async (req, res) => {
    const { username, phoneNumber, address } = req.body;

    console.log(username, phoneNumber, address);

    let user = await User.findOne({
        where: {
            id: req.user.id,
        },
    });

    let imageDir = path.join(__dirname + "../../");
    console.log(imageDir);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (req.file) {
        if (user.profilePicture) {
            fs.unlinkSync(path.join(imageDir + user.profilePicture));
        }
        await User.update(
            {
                username: username || user.username,
                phoneNumber: phoneNumber || user.phoneNumber,
                address: address || user.address,
                profilePicture: "/" + req.file.destination + req.file.filename,
            },
            {
                where: {
                    id: req.user.id,
                },
            }
        );
    } else {
        await User.update(
            {
                username: username || user.username,
                phoneNumber: phoneNumber || user.phoneNumber,
                address: address || user.address,
            },
            {
                where: {
                    id: req.user.id,
                },
            }
        );
    }

    user = await User.findOne({
        where: {
            id: req.user.id,
        },
    });

    res.status(200).json(user);
});

module.exports = { getUser, updateUser };
