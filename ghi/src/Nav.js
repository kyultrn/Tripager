import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToken } from "./accounts/Authenticator";
import { useAuthContext } from "./accounts/Authenticator";

export default function Navbar() {
  const { logout } = useToken();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    logout();
  };

  // const request = fetch('/token', {
  // headers: { Authorization: `Bearer ${token}` },
  // // Other fetch options, like method and body, if applicable
  // });
  // console.log(request)
  console.log(token)

  const handleLogin = () => {
    navigate("/login");
  };


  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);
  console.log(token)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <span className="tripager">TRIPAGER</span>
        </NavLink>
        <NavLink className="navbar-brand" to="/trips">
          <span className="trips">Trips</span>
        </NavLink>
        <div>
          {isLoggedIn ? (
            <button className="btn btn-green" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="btn btn-green" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
