import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./accounts/Login.js";
import Navbar from "./Nav.js";
import TripagerHome from "./TripagerHome.js";
import Trips from "./trips/Trips.js";
import Events from "./events/Events.js";
import ThingsToDo from "./things-to-do/ThingsToDo";
// import Footer from "./footer/Footer.js";



export default function App() {
  const domain = /https:\/\/[^/]+/;

  const basename = process.env.PUBLIC_URL.replace(domain, "");


  return (
    <>
      <BrowserRouter basename={basename}>
        <Navbar />
        <div className="container" style={{ maxWidth: '100%', padding: '0'}}>
          <Routes>
            <Route path="/" element={<TripagerHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/trips/:id/events" element={<Events />} />
            <Route path="/thingstodo" element={<ThingsToDo />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}
