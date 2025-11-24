import React from "react";
import { Link } from "react-router-dom";

function Folder(params) {
  const cleanPath = params.filePath.replace(/\/+/g, "/"); // <-- FIXED
  const isFile = params.foldername.includes(".");
  const icon = isFile ? "📄" : "📁";

  const handleDelete = async (folderPath) => {
    await fetch(`http://localhost:3000/users/${folderPath}`, {
      method: "DELETE",
    });
    params.retriggerEffect();
  };
  const handleRename = async () => {
    const newName = prompt("enter new name");
    if (!newName) return; // user canceled or empty

    if (params.currentFiles.includes(newName)) {
      alert("this name already exists!");
      return;
    }

    await fetch(`http://localhost:3000/users/${cleanPath}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newName }),
    });
    params.retriggerEffect();
  };

  console.log("this is params.folderPath /clean path: " + cleanPath);
  return (
    <div className="folder">
      <span className="icon">{icon}</span>

      <Link to={cleanPath} className="fileName">
        {params.foldername}
      </Link>

      <button onClick={() => handleRename()}>rename</button>

      <button onClick={() => handleDelete(cleanPath)}>delete</button>
    </div>
  );
}

export default Folder;
