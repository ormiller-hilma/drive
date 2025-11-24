import { Fragment, useState } from "react";
import { useEffect } from "react";
import Folder from "./Folder";
import AddFiles from "./AddFiles";
import { Form, useMatch } from "react-router-dom";
import { useParams } from "react-router-dom";

function Folders() {
  const { username } = useParams();
  const userpath = `/${username}`;
  const match = useMatch(userpath + "/*");
  const filePath = match.params["*"];

  console.log("filePath: ", filePath);

  const [data, setData] = useState([]);

  const [trigger, setTrigger] = useState(0);

  const retriggerEffect = () => {
    setTrigger((prev) => prev + 1);
  };

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
      <h1>all the Folders</h1>

      <AddFiles
        path={filePath}
        retriggerEffect={retriggerEffect}
        user={username}
      />
      <hr />
      {typeof data !== "string" &&
        data.map((e) => {
          const fullPath = filePath
            ? `${userpath}/${filePath}/${e}`
            : `${userpath}/${e}`;

          return (
            <Fragment key={e}>
              <Folder
                retriggerEffect={retriggerEffect}
                filePath={fullPath}
                foldername={e}
                currentFiles={data}
              />
              <br />
            </Fragment>
          );
        })}
      {typeof data === "string" && data}
    </>
  );
}
export default Folders;
