import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import UpdateAccount from "./accounts/UpdateAccount"
import { setLoginState } from "./store/AccountsSlice";
import { store } from "./store/store";
import { useDispatch } from "react-redux";
import VideoCarousel from "./VideoCarousel";


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container" style={{ maxWidth: '100%', padding: '0'}}>
          <Routes>
            <Route path="/" element={<TripagerHome />} />
            <Route path="/myaccount" element={<UpdateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/trips/:id/events" element={<Events />} />
            <Route path="/thingstodo" element={<ThingsToDo />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
