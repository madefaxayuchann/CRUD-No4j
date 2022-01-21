var express = require("express");
var axios = require("axios");
var router = express.Router();

/* GET home page. */

router.get("/", async function (req, res, next) {
  let result = await axios.get("https://api.kawalcorona.com");
  res.render("hitapi", { data: result.data });
});

// router.get("/data", async function (req, res, next) {
//   // let result = await axios.get("https://api.kawalcorona.com");
//   axios
//     .get("https://api.kawalcorona.com", {
//       headers: {
//         Accept: "application/json",
//       },
//     })
//     .then((resp) => {
//       console.log(resp.data);
//       console.log("masukkk");
//       res.send(resp);
//     });
// });

module.exports = router;
