const express = require("express");
const multer = require("multer");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUiExpress = require("swagger-ui-express");
const mongoose = require("mongoose");
const swaggerJSDoc = require("swagger-jsdoc");

const app = express();
dotenv.config();
app.use(cors({ origin: "*" }));
app.use("/public", express.static("./public"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//swagger set-Up start here
const swaggerOption = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      description: "for Blogs ",
      contact: {
        name: "Mohan Gurung",
      },
      servers: ["https://localhost:5000"],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOption);
app.use("/doc", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));

const home = require("./routes/home");
app.use("/home", home);

//server set-Up
// app.listen(process.env.PORT);
// console.log("server is running");

const PORT = process.env.PORT || 4000;
const CONNECTION_URL = process.env.CONNECTION_URL;
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => app.listen(PORT),
    console.log("Application is running at port:" + PORT)
  )
  .catch((err) => console.log(err));
