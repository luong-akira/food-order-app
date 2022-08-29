const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc       Register
// @route      POST /api/auth/register
// @access     PUBLIC
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    let user = await User.findOne({
        where: {
            email: email,
        },
    });

    if (
        !String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    ) {
        return res.status(400).json({
            message: "This is not a valid email",
        });
    }
    if (password.length < 6) {
        return res.status(400).json({
            message: "Your password must have at least 6 character",
        });
    }

    if (user) {
        return res.status(400).json({ message: "email has been existed" });
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        let token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, {
            expiresIn: "1d",
        });

        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token,
        });
    }
});

// @desc       Login
// @route      POST /api/auth/login
// @access     PUBLIC
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({
        where: {
            email: email,
        },
    });

    if (!user) {
        return res.status(404).json({ message: "Your email is not correct" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return res
            .status(404)
            .json({ message: "Your password is not correct" });
    } else {
        let token = jwt.sign({ id: user.id }, process.env.PRIVATE_KEY, {
            expiresIn: "1d",
        });

        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token,
        });
    }
});

// @desc       Change password
// @route      PUT /api/auth/changePassword
// @access     PRIVATE
const changePassword = asyncHandler(async (req, res) => {
    const { password, newPassword } = req.body;

    let user = await User.findOne({
        where: {
            id: req.user.id,
        },
    });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
        return res
            .status(404)
            .json({ message: "Your old password is not correct" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.update(
        {
            password: hashedPassword,
        },
        {
            where: {
                id: req.user.id,
            },
        }
    );

    let userWithNewPassword = await User.findOne({
        where: {
            id: req.user.id,
        },
    });

    res.json(201).json({ message: "Change password successfully" });
});

module.exports = { register, login, changePassword };
