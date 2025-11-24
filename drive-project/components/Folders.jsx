import { Fragment, useState } from "react";
import { useEffect } from "react";
import Folder from "./Folder";
import { Form, useMatch } from "react-router-dom";
import { useParams } from "react-router-dom";

function Folders() {
  const { username } = useParams();
  const userpath = `/${username}`;
  const match = useMatch(userpath + "/*");
  const filePath = match.params["*"];

  console.log("filePath: ", filePath);

  const [data, setData] = useState([]);
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
  }, [filePath, username]);

  return (
    <>
      <h1>all the Folders</h1>
      {typeof data !== "string" &&
        data.map((e) => {
          const fullPath = filePath
            ? `${userpath}/${filePath}/${e}`
            : `${userpath}/${e}`;

          return (
            <Fragment key={e}>
              <Folder filePath={fullPath} foldername={e} />
              <br />
            </Fragment>
          );
        })}
      {typeof data === "string" && data}
    </>
  );
}
export default Folders;
