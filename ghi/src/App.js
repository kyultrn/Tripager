import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { useToken } from "./accounts/Authenticator";
import Login from "./accounts/Login";
import SignUp from "./accounts/SignupModal.js";
import Navbar from "./Nav.js";
import TripagerHome from "./TripagerHome.js";
import Trips from "./trips/Trips.js";
import Events from "./events/Events.js";
import ThingsToDo from "./things-to-do/ThingsToDo";
import Footer from "./footer/Footer.js";
import AboutDevelopers from "./footer/AboutDevelopers";
import AboutTripager from "./footer/AboutTripager";
import Cursor from "./Cursor";

function GetToken() {
  useToken();
  return null;
}
function App() {
  return (
    <>
      <BrowserRouter>
      <Cursor />
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<TripagerHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/trips/:id/events" element={<Events />} />
            <Route path="/thingstodo" element={<ThingsToDo />} />
            <Route path="/about-developers" element={<AboutDevelopers />} />
            <Route path="/about-tripager" element={<AboutTripager />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
