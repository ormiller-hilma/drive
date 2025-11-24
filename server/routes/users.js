var express = require("express");
var router = express.Router();
var runLS = require("../ls");
var runOpenFile = require("../openFile");
var runDelete = require("../delete");
const runCreate = require("../create");
const runRename = require("../rename");


router.get("/*", async function (req, res) {
  const url = req.url;
  const path = "../server/database/users/";

  //try get files
  try {
    const dirArray = await runLS(path + `${url}`);
    res.send({ content: dirArray });
  } catch {

    // try open
    try {
      const content = await runOpenFile(path + url);
      res.send({ content });
    } catch {
      res.send({ err: "PATH DOES NOT EXIST" });
    }

  }
});

router.delete("/:id/*", async function (req, res) {
  const id = req.params.id;
  const url = req.url;
  const path = "../server/database/users";
  try {
    const content = await runDelete(`${path}${url}`);
    res.send({ content });
  } catch {
    res.send({ err: "COULD NOT DELETE" });
  }
});

router.post("/:id/:path(*)?/:file", async function (req, res) {
  const { id, file } = req.params;
  const wildcard = req.params.path || "";

  const body = req.body
  const path = "../server/database/users";
  try {
    const content = await runCreate(`${path}/${id}/${wildcard}/`, file, body.content);
    res.send({ content });
  } catch {
    res.send({ err: "COULD NOT CREATE" });
  }
});

router.put("/:id/:path(*)?/:file", async function (req, res) {
  const { id, file } = req.params;
  const wildcard = req.params.path || "";

  const body = req.body
  const path = "../server/database/users";
  try {
    const content = await runRename(`${path}/${id}/${wildcard}/`, file, req.body.content);
    res.send({ content });
  } catch (error) {
    console.log('error: ', error);
    res.send({ err: "COULD NOT RENAME" });
  }
});


module.exports = router;
