// routes/users.js
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

router.get("/createData", async function (req, res) {
  console.log("masuk");
  const name = req.query.name;
  const email = req.query.email;
  const query = `CREATE (n:Users {id: ${Date.now()}, name: "${name}", email: "${email}"}) RETURN n`;
  const resultObj = await graphDBConnect.executeCypherQuery(query, {});
  const result = formatResponse(resultObj);
  res.send(result);
});

router.get("/delete", async function (req, res) {
  const { id } = req.query;
  const query = `MATCH (n:Users {id: ${id}}) DELETE n`;
  const params = { id: parseInt(id) };
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  res.status(200).send(resultObj);
});

router.get("/edit", async function (req, res) {
  const { id, name, email } = req.query;
  const query = `MATCH (n:Users {id: ${id}}) SET n.name = "${name}", n.email = "${email}" RETURN n`;
  const params = { id: parseInt(id) };
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  const result = formatResponse(resultObj);
  console.log(200);
  res.status(200).send(result);
});

router.get("/", async function (req, res) {
  const query = "MATCH (n:Users) RETURN n LIMIT 100";
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  const result = formatResponse(resultObj);
  res.render("layout", { data: result });
});

router.get("/table", async function (req, res) {
  const query = "MATCH (n:Users) RETURN n LIMIT 100";
  const params = {};
  const resultObj = await graphDBConnect.executeCypherQuery(query, params);
  const result = formatResponse(resultObj);
  res.render("table", { data: result });
});

module.exports = router;
