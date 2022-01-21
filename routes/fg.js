var express = require("express");
var router = express.Router();
var axios = require("axios");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let result = await axios.get("https://api.kawalcorona.com");
  res.render("fg", { data: result.data });
  // res.send(result.data);
});

router.get("/data", async function (req, res, next) {
  let result = await axios.get("https://api.kawalcorona.com");
  res.send(result.data);
});

module.exports = router;
