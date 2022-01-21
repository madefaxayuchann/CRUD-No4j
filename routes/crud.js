const express = require("express");
var cron = require("node-cron");
const router = express.Router();
const graphDBConnect = require("../middleware/graphDBConnect");
function formatResponse(resultObj) {
  const result = [];
  if (resultObj.records.length > 0) {
    resultObj.records.map((record) => {
      result.push(record._fields[0].properties);
    });
  }
  return result;
}
/* GET home page. */

router.get("/createData", async function (req, res) {
  console.log("masuk penulis");
  const name = req.query.name;
  const penulis = req.query.penulis;
  const query = `CREATE (n:book {id: ${Date.now()}, name: "${name}", penulis: "${penulis}"}) RETURN n`;
  const resultObj = await graphDBConnect.executeCypherQuery(query, {});
  const result = formatResponse(resultObj);
  console.log(result);
  res.send(result);
});

router.get("/edit", async function (req, res) {
  const { id, name, penulis } = req.query;
  const query = `MATCH (n:book {id: ${id}}) SET n.name = "${name}", n.penulis = "${penulis}" RETURN n`;
  const params = { id: parseInt(id) };
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  const result = formatResponse(resultObj);
  console.log(200);
  res.status(200).send(result);
});

router.get("/delete", async function (req, res) {
  const { id } = req.query;
  const query = `MATCH (n:book {id: ${id}}) DELETE n`;
  const params = { id: parseInt(id) };
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  res.status(200).send(resultObj);
});

router.get("/", async function (req, res) {
  const query = "MATCH (n:book) RETURN n LIMIT 100";
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  const result = formatResponse(resultObj);
  res.render("crud", { data: result });
});

module.exports = router;
