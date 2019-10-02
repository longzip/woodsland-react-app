//server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const favicon = require("express-favicon");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const router = express.Router();
app.use(favicon(__dirname + "/build/favicon.ico"));
// Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());

const routes = require("./routes/index.js");
app.use("/api/v1", routes(router));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));
app.get("/ping", function(req, res) {
  return res.send("pong");
});
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(port);
