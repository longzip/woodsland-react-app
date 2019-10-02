require("dotenv").config(); // Sets up dotenv as soon as our application starts
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const router = express.Router();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

// This is equivalent to
app.use("/", bodyParser.json());

const environment = process.env.NODE_ENV;
if (environment !== "production") {
  const logger = require("morgan");
  app.use(logger("dev"));
  app.use("/", logger("dev"));
}

const routes = require("./routes/index.js");

app.use("/api/v1", routes(router));
// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public")));
app.get("/.*/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
