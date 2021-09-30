const express = require("express");
const router = express.Router();

//  Beers Model

const Hop = require("../../models/Hop");

// qroute GET api/hops
// @desc GET All hops
// @access Public

router.get("/api/hops", (req, res) => {
    Hop.find()
        .sort({ date: -1 })
        .then((hops) => {
            console.log(hops);
            res.json(hops);
        });
});
// @route POST api/hops
// @desc CREATE a beer
// @access Public
// at mongo database the collection items wíll automatically created >>>  db.beers.find().pretty();
router.post("/api/hop", (req, res) => {
    const newHop = new Hop({
        class: req.body.class,
        sort: req.body.sort,
        origin: req.body.origin,
        aroma: req.body.aroma,
        alpha: req.body.alpha,
        fitsToBeer: req.body.fitsToBeer,
    });
    newHop.save().then((hop) => {
        console.log("hop is saved to database", hop);
        res.json(hop);
    });
});

// @route DELETE api/hop/:id
// @desc DELETE an hop
// @access Public
// at mongo database the collection beers wíll automatically created >>>  db.beers.find().pretty();
router.delete("/api/hop/:id", (req, res) => {
    Hop.findById(req.params.id).then((hops) =>
        hops.remove().then(() => res.json({ success: true }))
    );
});

module.exports = router;
