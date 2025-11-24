const fs = require("fs/promises");
const path = require("node:path");

async function runRename(path) {
    if (await fs.exists(path)) {
        console.log("EXISTS");
    }
    else {
        console.log("NOT EXISTS");
    }
}
module.exports = runRename;
