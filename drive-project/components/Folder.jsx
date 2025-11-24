import React from "react";
import { Link } from "react-router-dom";
function Folder(params) {
  const cleanPath = params.filePath.replace(/\/+/g, "/"); // <-- FIXED

  const handleDelete = async (folderPath) => {
    fetch(`http://localhost:3000/users/${folderPath}`, { method: "DELETE" });
  };
  console.log("this is params.folderPath /clean path: " + cleanPath);
  return (
    <>
      {/* <File name={params.foldername} /> */}

      <button onClick={() => handleDelete(cleanPath)}> delete</button>
      <Link to={cleanPath}>{cleanPath}</Link>
    </>
  );
}

export default Folder;
