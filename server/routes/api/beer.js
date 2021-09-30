const express = require("express");
const router = express.Router();

//  Beers Model

const Beer = require("../../models/Beer");

// qroute GET api/beer
// @desc GET All Beers
// @access Public

router.get("/api/beer", (req, res) => {
	Beer.find()
		.sort({ date: -1 })
		.then((beers) => {
			console.log("beers");
			res.json(beers);
		});
});
// @route POST api/beers
// @desc CREATE a beer
// @access Public
// at mongo database the collection items wíll automatically created >>>  db.beers.find().pretty();
router.post("/api/beer", (req, res) => {
	const newBeer = new Beer({
		name: req.body.name,
	});
	newBeer.save().then((beer) => {
		console.log("beer", beer);
		res.json(beer);
	});
});

// @route DELETE api/beer/:id
// @desc DELETE an beer
// @access Public
// at mongo database the collection beers wíll automatically created >>>  db.beers.find().pretty();
router.delete("/api/beer/:id", (req, res) => {
	Beer.findById(req.params.id).then((beers) =>
		beers.remove().then(() => res.json({ success: true }))
	);
});

module.exports = router;
