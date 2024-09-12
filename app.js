require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const apiRoutes = require("./src/routes/api");
const errorHandler = require("./src/middleware/errorHandler");

require("./src/config/sequelize");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "./public";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api", apiRoutes);

app.post("/api/upload", upload.array("files"), (req, res) => {
  try {
    const filePaths = req.files.map((file) => `/public/${file.filename}`);
    res.status(200).json({ filePaths });
  } catch (error) {
    res.status(500).json({ error: "File upload failed" });
  }
});

app.use("/api/public", express.static("public"));

app.use(errorHandler);

module.exports = app;
