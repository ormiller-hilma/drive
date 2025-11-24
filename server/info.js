const fs = require("fs/promises");
const path = require("node:path");

async function runInfo(path) {
  const stats = await fs.stat(path, { bigint: true });
  // console.log("isFile:", stats.birthtime);          // BigInt
  // console.log("Modified (ns):", stats.mtimeNs); // BigInt nanoseconds
  // console.log(stats);
  return stats
}

module.exports = runInfo;
