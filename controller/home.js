const HomeModel = require("../model/home");
module.exports.getHome = async (req, res) => {
  try {
    let data = await HomeModel.find();
    res.status(200).json({
      message: "all the records",
      data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.HomePost = async (req, res) => {
  console.log(req.body, req.files, req.file);
  try {
    const data = new HomeModel({
      headline: req.body.headline,
      title: req.body.title,
      images: req.file.path,
    });
    await data.save();
    res.status(200).json({
      message: "worked",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
