import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import { AuthProvider, useToken } from "./Accounts/Authenticator";
import Login from "./Accounts/Login";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  const [launch_info, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      if (response.ok) {
        console.log("got launch data!");
        setLaunchInfo(data.launch_details);
      } else {
        console.log("drat! something happened");
        setError(data.message);
      }
    }
    getData();
  }, []);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <GetToken />
          <div className="container">
            <Routes>
              {/* <Route path="/" element={<MainPage/>} /> */}
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
