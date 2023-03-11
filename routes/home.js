const express = require("express");
const HomeController = require("../controller/home");
const multer = require("multer");
let router = express.Router();

router.get("/", HomeController.getHome);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req, file);
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    console.log(req, file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("images"), HomeController.HomePost);

module.exports = router;
