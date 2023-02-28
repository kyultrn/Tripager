import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <span className="tripager">Tripager</span>
        </NavLink>
        <NavLink className="navbar-brand" to="/trips">
          <span className="trips">Trips</span>
        </NavLink>
        <NavLink className="navbar-brand" to="/thingstodo">
          <span className="thingstodo">Things To Do</span>
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
