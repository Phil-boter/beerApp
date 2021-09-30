const express = require("express");
const router = express.Router();
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const auth = require("../middleware/auth"); // adding auth to routes makes them protected
// Porject Model

const Project = require("../../models/Project");

// qroute GET api/projects
// @desc GET All Items
// @access Public

router.get("/api/projects", (req, res) => {
    console.log("get project");
    Project.find()
        .sort({ date: +1 })
        .then((projects) => res.json(projects));
});

// qroute GET api/projects/:projectId
// @desc GET single project
// @access Public

router.get("/api/projects/:projectId", (req, res) => {
    console.log("get  single project", req.params.projectId);
    Project.find({ _id: req.params.projectId }).then((project) =>
        res.json(project)
    );
});

// @route POST api/projects
// @desc CREATE a post
// @access Public
// at mongo database the collection items wíll automatically created >>>  db.items.find().pretty();

// -------------- image upload -------------------

router.use(express.static(path.join(__dirname, "build", "assets")));
router.use(express.static(path.join(__dirname, "public", "assets")));

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log("callback1", file);
        callback(null, __dirname + "/../../../public/assets");
    },
    filename: function (req, file, callback) {
        console.log("file", file);

        // uidSafe(24).then((uid) => {
        //     console.log("callback2", file);
        callback(null, file.originalname);
        // });
    },
});
const upload = multer({
    storage: diskStorage,
    limits: {
        // Set a file size limit to prevent users from uploading huge files and to protect against DOS attacks
        fileSize: 2097152,
    },
});

// -------------- image upload end -------------------

router.post("/api/projects", upload.single("file"), async (req, res) => {
    console.log("post project");
    // console.log("post project", req.body);
    // console.log("file project", req.file);
    try {
        const newProject = await new Project({
            title: req.body.title,
            title_second: req.body.title_second,
            description: req.body.description,
            technology: req.body.technology,
            link: req.body.link,
            image: req.body.image,
            images: [req.body.images],
            host: req.body.host,
        });

        await newProject.save().then((project) => {
            console.log("project", project);
            res.json(project);
        });
    } catch (error) {
        res.status(404).json({ success: false });
    }
});

// @route DELETE api/projects/:id
// @desc DELETE an item
// @access Public
// at mongo database the collection items wíll automatically created >>>  db.items.find().pretty();
router.delete("/api/projects/:id", (req, res) => {
    console.log("delete project");
    Project.findById(req.params.id)
        .then((project) =>
            project.remove().then(() => res.json({ success: true }))
        )
        .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
