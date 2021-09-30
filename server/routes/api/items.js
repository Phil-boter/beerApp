const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");

// Item Model

const Item = require("../../models/Item");

// qroute GET api/items
// @desc GET All Items
// @access Public

router.get("/api/items", (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then((items) => res.json(items));
});

// @route POST api/items
// @desc CREATE a post
// @access Public
// at mongo database the collection items wíll automatically created >>>  db.items.find().pretty();
router.post("/api/items", (req, res) => {
    const newItem = new Item({
        name: req.body.name,
    });
    newItem.save().then((item) => {
        res.json(item);
    });
});

// @route DELETE api/items/:id
// @desc DELETE an item
// @access Public
// at mongo database the collection items wíll automatically created >>>  db.items.find().pretty();
router.delete("/api/items/:id", (req, res) => {
    Item.findById(req.params.id)
        .then((item) => item.remove().then(() => res.json({ success: true })))
        .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
