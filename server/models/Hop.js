const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HopSchema = new Schema({
	class: { type: String, required: true },

	sort: {
		type: String,
		required: true,
	},
	origin: {
		type: String,
		required: true,
	},
	aroma: {
		type: Array,
		required: true,
	},
	alpha: {
		type: Number,
		required: true,
	},
	fitsToBeer: {
		type: Array,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});
module.exports = Hop = mongoose.model("hop", HopSchema);
