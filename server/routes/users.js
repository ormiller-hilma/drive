var express = require("express");
var router = express.Router();
var runLS = require("../ls");
var runOpenFile = require("../openFile");
var runDelete = require("../delete");
const runCreate = require("../create");
const runRename = require("../rename");
const Path = require("path")
const Url = require("url")
const runInfo = require("../info")




router.get("/*", async function (req, res) {
  const url = req.url;
  const path = "../server/database/users";

  const parsedUrl = Url.parse(url, true).query;
  const baseUrl = (path + url).split("?")[0]
  // console.log('baseUrl: ', baseUrl);
  // console.log('parsedUrl: ', parsedUrl);

  if (parsedUrl.info) {

    const stats = await runInfo(baseUrl)
    console.log();
    res.send({ content: [stats.birthtime, Number(stats.size), stats.isFile()] });

    return;
  }

  //try get files
  try {
    const dirArray = await runLS(path + url);
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
  const filePath = `${path}/${id}/${wildcard}/`
  console.log("extname, " + Path.extname(filePath + file));
  try {
    const content = await runRename(filePath, file, body.content + Path.extname(filePath + file));
    res.send({ content });
  } catch (error) {
    console.log('error: ', error);
    res.send({ err: "COULD NOT RENAME" });
  }
});


module.exports = router;
