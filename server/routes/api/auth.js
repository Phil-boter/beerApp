const express = require("express");
const router = express.Router();
const { hash, compare } = require("../../middleware/bc");

//Admin Model

const User = require("../../models/User");

// qroute post api/auth /login
// @desc post All Admins
// @access Public

router.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("filds not filled");
        return res.status(400).json({ msg: "please enter all fields" });
    }
    //check for admin
    User.findOne({ email }).then((user) => {
        if (!user) return res.status(400).json({ msg: "User does not exist" });

        //validate password
        // console.log("password user", user.password);
        // console.log("password ", password);
        compare(password, user.password)
            .then((result) => {
                if (result) {
                    console.log("user in login", user);
                    res.send({
                        isLoggedIn: true,
                        userId: user._id,
                    }).status(200);
                } else {
                    console.log("invalid credentials");
                    res.status(400).json({ msg: "invalid credentials" });
                }
            })
            .catch((err) => {
                console.log("invalid credentials", err);
                res.status(400).json({ msg: "invalid credentials" });
            });
    });
});

// qroute post api/user / register
// @desc post new User
// @access Public

router.post("/api/auth/addUser", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    console.log(first_name, last_name, email, password);
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ msg: "please enter all fields" });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
        first_name,
        last_name,
        email,
        password,
    });
    console.log("new user", newUser);
    newUser.password = await hash(password);
    // console.log("new ", newUser);
    await newUser.save().then((user) => {
        console.log("userdata is stored", user);

        res.json({
            success: true,
            userId: user._id,
            user: {
                id: user._id,
                first: user.first_name,
                last: user.last_name,
                email: user.email,
            },
        });
    });
});

router.get("/api/auth/logout", (req, res) => {
    console.log("logout");
    req.session.id = null;
    // res.redirect("/");
    res.status(200).send();
});

module.exports = router;
