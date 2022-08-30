const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const Address = require("../models/Address");

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
        bio: user.bio,
        profilePicture: user.profilePicture,
    });
});

// @desc       update user
// @route      PUT /api/users/:id
// @access     PRIVATE
const updateUser = asyncHandler(async (req, res) => {
    const { username, bio } = req.body;

    console.log(username, bio);

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
                bio: bio || user.bio,
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
                bio: bio || user.bio,
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

// @desc       get all adresses
// @route      GET /api/users/address
// @access     PRIVATE
const getAllAddrresses = asyncHandler(async (req, res) => {
    const createdAdresses = await Address.findAll({
        where: {
            userId: req.user.id,
        },
    });

    if (!createdAdresses) {
        return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(createdAdresses);
});

// @desc       Add a adress
// @route      POST /api/users/address
// @access     PRIVATE
const addAddress = asyncHandler(async (req, res) => {
    const { name, phone, address } = req.body;
    console.log(name, Number(phone), address);
    const user = await User.findOne({
        where: {
            id: req.user.id,
        },
    });

    if (!name || !Number(phone) || !address) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    await Address.create({
        name,
        phone: Number(phone),
        address,
        userId: user.id,
    });

    const createdAdresses = await Address.findAll({
        where: {
            userId: user.id,
        },
    });

    res.status(200).json(createdAdresses);
});

// @desc       Update a adress
// @route      PUT /api/users/address/:id
// @access     PRIVATE
const updateAddress = asyncHandler(async (req, res) => {
    const { name, phone, address } = req.body;

    const user = await User.findOne({
        where: {
            id: req.user.id,
        },
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const existAdress = await Address.findOne({
        where: {
            id: req.params.id,
        },
    });

    console.log(existAdress);
    if (!existAdress) {
        return res.status(404).json({ message: "Adress not found" });
    }

    existAdress.name = name || existAdress.name;
    console.log(existAdress.name);
    existAdress.phone = Number(phone) || existAdress.phone;
    existAdress.address = address || existAdress.address;

    await existAdress.save();

    const createdAdresses = await Address.findAll({
        where: {
            userId: user.id,
        },
    });

    res.status(200).json(createdAdresses);
});

// @desc       delete a adress
// @route      DELETE /api/users/address/:id
// @access     PRIVATE
const deleteAddress = asyncHandler(async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.user.id,
        },
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const existAdress = await Address.findOne({
        where: {
            id: req.params.id,
            userId: user.id,
        },
    });

    if (!existAdress) {
        return res.status(404).json({ message: "Adress not found" });
    }

    await existAdress.destroy();

    const createdAdresses = await Address.findAll({
        where: {
            userId: user.id,
        },
    });

    res.status(200).json(createdAdresses);
});

module.exports = {
    getUser,
    updateUser,
    getAllAddrresses,
    addAddress,
    updateAddress,
    deleteAddress,
};
