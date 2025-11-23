var express = require("express");
var router = express.Router();
var runLS = require("../ls");
var runOpenFile = require("../openFile");

/* GET home page. */
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
  console.log("blabla");
  const id = req.params.id;
  const file = req.params.file;
  const path = "../server/database/";
  try {
    const dirArray = await runOpenFile(path + `${id}/${file}`);

    console.log("dirArray: ", dirArray);
    res.send({ content: dirArray });
  } catch {
    res.send("USER DOES NOT EXIST");
  }
});

module.exports = router;
