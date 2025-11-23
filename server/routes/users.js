var express = require("express");
var router = express.Router();
var runLS = require("../ls");
var runOpenFile = require("../openFile");
var runDelete = require("../delete")

router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  console.log("id: ", id);
  const path = "../server/database/";
  try {
    const dirArray = await runLS(path + `${id}`);
    res.send({ arr: dirArray });
  } catch {
    res.send("USER DOES NOT EXIST");
  }
});

router.get("/:id/:file", async function (req, res, next) {
  const id = req.params.id;
  const file = req.params.file;
  const path = "../server/database/";
  try {
    const content = await runOpenFile(path + `${id}/${file}`);
    res.send({ content });
  } catch {
    res.send({ err: "PATH DOES NOT EXIST" });
  }
});

router.delete("/:id/:file", async function (req, res, next) {
  const id = req.params.id;
  const file = req.params.file;
  const path = "../server/database/";
  try {
    const content = await runDelete(path + `${id}/${file}`);
    res.send({ content });
  } catch {
    res.send({ err: "PATH DOES NOT EXIST" });
  }
});

module.exports = router;
