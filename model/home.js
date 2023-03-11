const mongoose = require("mongoose");
const HomeSchema = mongoose.Schema({
  title: String,
  headline: String,
  images: String,
});

const HomeModel = mongoose.model("Home", HomeSchema);
module.exports = HomeModel;
