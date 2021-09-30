// const jwtSecret = require("../../../secrets.json").jwtSecret;
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("x-auth-token");

    // check for token  status 401 == unautorized
    if (!token) {
        res.status(401).json({
            msg: "no token, authorization failed",
        });
    }
    try {
        // verify token

        const decoded = jwt.verify(token, jwtSecret);

        // add admin from payload

        req.admin = decoded;
        next();
    } catch (err) {
        res.status(400).json({ msg: "token is not valid" });
    }
}
module.exports = auth;
