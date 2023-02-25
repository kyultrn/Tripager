import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider, useToken } from "./accounts/Authenticator";
import Login from "./accounts/Login";
import SignUp from "./accounts/Signup.js";
import Navbar from "./Nav.js";
import MainPage from "./MainPage.js"
import Trips from "./trips/Trips.js";
import Events from "./events/Events.js";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <GetToken />
          <Navbar/>
          <div className="container">
            <Routes>
              <Route path="/" element={<MainPage/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/trips/:id/events" element={<Events />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
