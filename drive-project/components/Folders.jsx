import { Fragment, useState } from "react";
import { useEffect } from "react";
import Folder from "./Folder";
import AddFiles from "./AddFiles";
import { Form, useMatch } from "react-router-dom";
// import { Link } from "react-router-dom";

function Folders() {
  const match = useMatch("/orchuk/*");
  const filePath = match.params["*"];

  console.log("filePath: ", filePath);

  const [data, setData] = useState([]);
  const [trigger, setTrigger] = useState(0);

  const retriggerEffect = () => {
    setTrigger((prev) => prev + 1); // increment to retrigger
  };

  const username = "orchuk";
  useEffect(() => {
    async function fetchdata(username) {
      try {
        const url = filePath
          ? `http://localhost:3000/users/${username}/${filePath}`
          : `http://localhost:3000/users/${username}`;

        const res = await fetch(url);
        const data = await res.json();

        setData(data.content);
      } catch (err) {
        console.log(err);
      }
    }
    console.log("filePath: ", filePath);
    fetchdata(username);
  }, [filePath, username, trigger]);

  return (
    <>
      <AddFiles path={filePath} retriggerEffect={retriggerEffect} />
      <h1>all the Folders</h1>
      {typeof data !== "string" &&
        data.map((e) => {
          return (
            <Fragment key={e}>
              <Folder
                retriggerEffect={retriggerEffect}
                filePath={"/orchuk/" + filePath + `/${e}`}
                foldername={e}
              />{" "}
              <br />
            </Fragment>
          );
        })}
      {typeof data === "string" && data}
    </>
  );
}
export default Folders;
