import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./accounts/Login";
import Navbar from "./Nav";
import TripagerHome from "./TripagerHome";
import Trips from "./trips/Trips";
import Events from "./events/Events";
import ThingsToDo from "./things-to-do/ThingsToDo";
// import Footer from "./footer/Footer.js";
import SignUp from "./accounts/Signup.js";



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
            <Route path="/signup" element={<SignUp />} />

          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  )
}
