import React from "react";
import { Link } from "react-router-dom";
function Folder(params) {
  return (
    <>
      {/* <File name={params.foldername} /> */}
      <Link to={params.filePath}>{params.foldername}</Link>
    </>
  );
}

export default Folder;
