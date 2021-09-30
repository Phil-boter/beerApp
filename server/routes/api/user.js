const express = require("express");
const router = express.Router();
const { hash, compare } = require("../../middleware/bc");

//user Model

const User = require("../../models/User");

// qroute get api/user/:id
// @desc get user data
// @access Privte
// every admin has its own token whci verifey him/her on the login
router.get("/api/user/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!req.params.id) {
        return res.status(400).json({ success: false });
    }
    User.findById(id).then((user) => {
        console.log("get user", user);
        res.json({
            success: true,
            userId: id,
            user: user,
        });
    });
});

module.exports = router;
