const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
    },
    title_second: {
        type: String,
    },
    description: {
        type: String,
    },
    technology: {
        type: String,
    },
    link: {
        type: String,
    },
    image: {
        type: String,
    },
    images: {
        type: Array,
    },
    host: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
module.exports = Project = mongoose.model("project", ProjectSchema);
