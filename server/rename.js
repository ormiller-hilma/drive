const fs = require("fs/promises");
const path = require("node:path");

async function runRename(path, fileName, newFileName) {
    console.log('path: ', path);
    try {
        await fs.access(path)
        //exists:

        fs.rename(path + fileName, path + newFileName)
    }
    catch (err) {
        console.log('err: ', err);
    }
}
module.exports = runRename;
