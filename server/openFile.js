const fs = require("fs/promises");
const path = require("node:path");

async function runOpenFile(path) {
  try {
    const data = await fs.readFile(path, "utf-8");
    console.log("data:", data);
    return data;
  } catch (err) {
    console.log("err:", err);
    return {};
  }
}
module.exports = runOpenFile;
