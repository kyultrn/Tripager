import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider, useToken } from "./accounts/authenticator";
import Login from "./accounts/Login";
import SignUp from "./accounts/Signup.js";
import Navbar from "./Nav.js";
import TripagerHome from "./TripagerHome.js";
import Trips from "./trips/Trips.js";
import Events from "./events/Events.js";
import ThingsToDo from "./ThingsToDo";
import Footer from "./Footer.js";

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
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<TripagerHome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/mytrips" element={<Trips />} />
              <Route path="/trips/:id/events" element={<Events />} />
              <Route path="/thingstodo" element={<ThingsToDo />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
