import React from "react";
import { useState } from "react";

async function AddFile(url, content) {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: content }),
  });
  console.log("POSTED");
}

function AddFiles({ path }) {
  const [fileText, SetFileText] = useState("");
  const [fileContent, SetFileContent] = useState("");

  return (
    <>
      <input
        type="text"
        onChange={({ target }) => SetFileText(target.value)}
        value={fileText}
      />

      <br />

      <input
        type="text"
        onChange={({ target }) => SetFileContent(target.value)}
        value={fileContent}
      />

      <br />

      <button
        onClick={() =>
          AddFile(
            `http://localhost:3000/users/orchuk/${path}/${fileText}`,
            fileContent
          )
        }
      >
        Add
      </button>
    </>
  );
}

export default AddFiles;
