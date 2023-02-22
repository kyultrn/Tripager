import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useToken } from "./Accounts/Authenticator";
import { useAuthContext } from "./Accounts/Authenticator";

export default function Navbar() {
  const { logout } = useToken();

  const handleLogout = () => {
    logout();
  };

  const navigate = useNavigate();

  const { token } = useAuthContext();
  console.log(token)

  const handleLogin = () => {
    navigate("/login");
  };
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
