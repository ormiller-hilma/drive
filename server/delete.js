const fs = require("fs");
const path = require("node:path");

async function runDelete(path) {
  fs.unlink(path, (err) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log("Could not delete Folder does not exist")
        return "Could not delete Folder does not exist"
      }
      else {
        console.log(err);
        return "ERROR"
      }
    }
    return "deleted folder";
  })
}
module.exports = runDelete;
