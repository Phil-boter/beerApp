const { reset } = require("enzyme/build/configuration");
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
    console.log("get user");
    const { id } = req.params;
    if (!req.params.id) {
        return res.status(400).json({ success: false });
    }
    User.findById(id)
        .then((user) => {
            console.log("get user", user);
            res.json({
                success: true,
                userId: id,
                user: user,
            });
        })
        .catch((error) => {
            console.log("error inget user", error);
        });
});

router.post("/api/user/bioUpload", async (req, res) => {
    console.log("set bio");
    const { bio, id } = req.body;

    console.log("bio", bio, id);
    User.findByIdAndUpdate(
        id,
        { bio: bio },
        { new: true },
        function (err, result) {
            if (err) {
                res.status(404).send(err);
            } else {
                console.log(result);
                res.json({ success: true, userId: id, user: result });
            }
        }
    );
});

router.post("/api/user/uploadUserPicture", (req, res) => {
    console.log("req in upload ", req.body);
    const { image, id } = req.body;
    User.findByIdAndUpdate(
        id,
        { image: image },
        { new: true },
        function (err, result) {
            if (err) {
                res.status(404).send(err);
            } else {
                console.log(result);
                res.json({ success: true, userId: id, user: result });
            }
        }
    );
});
module.exports = router;
