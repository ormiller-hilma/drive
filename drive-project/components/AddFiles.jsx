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

function AddFiles({ path, retriggerEffect, user }) {
  const [fileText, SetFileText] = useState("");
  const [fileContent, SetFileContent] = useState("");

  return (
    <>
      <label for="fileName">File name:</label>
      <input
        name="fileName"
        type="text"
        onChange={({ target }) => SetFileText(target.value)}
        value={fileText}
      />

      <br />
      <label for="fileContent">File content:</label>

      <input
        name="fileContent"
        type="text"
        onChange={({ target }) => SetFileContent(target.value)}
        value={fileContent}
      />

      <br />

      <button
        onClick={async () => {
          await AddFile(
            `http://localhost:3000/users/${user}/${path}/${fileText}`,
            fileContent
          );
          retriggerEffect();
        }}
      >
        Add
      </button>
    </>
  );
}

export default AddFiles;
