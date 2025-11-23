const fs = require("fs");
const path = require("node:path");

async function runCreate(path, fileName, content) {
  // test if there is a file extention
  if (/.\../.test(fileName)) {
    fs.writeFile(path + fileName, content, (err) => {
      if (err) {
        console.log('err: ', err);
      }
    })
    console.log("not folder")
    return
  }

  fs.mkdir(path + fileName, (err) => {
    if (err) {
      if (err.code === "EEXIST") {
        console.log("FOLDER ALREADY EXISTS");
      }
    }
    else {
      console.log('Folder created successfully!');
    }
  })


}
module.exports = runCreate;
