import "./App.css";
import Folders from "../components/Folders";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // <-- FIXED
import Folder from "../components/Folder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/:username/*`} element={<Folders />} />
        {/*i deleted the * bc it create problams */}

        {/* <Route
          path="/orchuk/:foldername"
          element={<Folder username={"orchuk"} />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
