const fs = require("fs/promises");
const path = require("node:path");

async function runLS(path) {
  const arr = await fs.readdir(path);
  return arr;
}
module.exports = runLS;
