import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import { AuthProvider, useToken } from "./accounts/Authenticator";
import Login from "./accounts/Login";
import SignUp from "./accounts/Signup.js";
import Navbar from "./Nav.js";
import MainPage from "./MainPage.js"
import Trips from "./trips/Trips.js";

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
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
