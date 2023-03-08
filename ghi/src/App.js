import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./accounts/Login";
import Navbar from "./Nav.js";
import TripagerHome from "./TripagerHome.js";
import Trips from "./trips/Trips.js";
import Events from "./events/Events.js";
import ThingsToDo from "./things-to-do/ThingsToDo";
import Footer from "./footer/Footer.js";
import AboutDevelopers from "./footer/AboutDevelopers";
import AboutTripager from "./footer/AboutTripager";


export default function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container" style={{ maxWidth: '100%', padding: '0'}}>
          <Routes>
            <Route path="/" element={<TripagerHome />} />
            <Route path="/login" element={<Login />} />
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
  )
}
