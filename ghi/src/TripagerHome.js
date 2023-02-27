import { useAuthContext } from "./accounts/Authenticator";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";


export default TripagerHome;
function TripagerHome() {
  const { token } = useAuthContext();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleNotLoggedRedirect = () => {
    navigate("/signup");
  };

  const handleLoggedInRedirect = () => {
    navigate("/trips");
  };


  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);


  return (
    <div>
      <h1>Tripager</h1>
      <h2>Plan and manage your next trip here!</h2>
      <div>
        {isLoggedIn ? (
          <button className="btn btn-green" onClick={handleLoggedInRedirect}>
            My Trips
          </button>
        ) : (
          <button className="btn btn-green" onClick={handleNotLoggedRedirect}>
            Get Started
          </button>
        )}
      </div>
    </div>
  );
}
