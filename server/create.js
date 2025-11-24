const fs = require("fs");
const path = require("node:path");

async function runCreate(path, fileName, content) {
  // test if there is a file extention
  if (/.\../.test(fileName)) {
    try {
      console.log(typeof content);
      fs.writeFile(path + fileName, content, (err) => {
        console.log("INSIDE WRITE FILE");
        if (err) {
          console.log('err: ', err);
        }
        console.log("created file");
      })
      console.log("not folder")
      return
    } catch (error) {
      console.log('error: ', error);
    }
    return
  }

  console.log("MKDIR");

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
