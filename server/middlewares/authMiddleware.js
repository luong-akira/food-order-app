const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    try {
        let decode = await jwt.verify(token, process.env.PRIVATE_KEY);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = { protect };
