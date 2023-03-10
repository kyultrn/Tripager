import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { useGetTokenQuery, useUserLogoutMutation } from "./store/ApiSlice";
import { useDispatch } from "react-redux";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Navbar() {
  const selectedTripId = useSelector((state) => state.tripForm.selectedTripId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const [logout, { data }] = useUserLogoutMutation();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };
  useEffect(() => {
    if (data) {
      // navigate('/login');
    }
  }, [data, navigate]);

  const handleLogin = () => {
    navigate("/login");
  };

  const isLoginOrSignUpPage = [
    "/login",
    "/signup",
    "/trips",
    `/trips/${selectedTripId}/events`,
    "/thingstodo",
    "/myaccount",
  ].includes(location.pathname);

  return (
    <nav
      id="navbar"
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: isLoginOrSignUpPage ? "#413E3F" : "inherit",
        height: "80px",
      }}
    >
      <div className="container-fluid">
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <button className="btn getstarted scrollto">Tripager</button>
        </NavLink>
        <button
          className="btn navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {token ? (
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <NavLink to="/trips" style={{ textDecoration: "none" }}>
                <li className="nav-item">
                  <button className="btn getstarted scrollto">Trips</button>
                </li>
              </NavLink>
              <NavLink to="/thingstodo" style={{ textDecoration: "none" }}>
                <li className="nav-item">
                  <button className="btn getstarted scrollto">
                    Things To Do
                  </button>
                </li>
              </NavLink>
            </ul>
            <ul className="navbar-nav ml-auto d-flex">
              <li className="nav-item ml-auto" style={{ marginLeft: "auto" }}>
                <button
                  style={{ textDecoration: "none" }}
                  className="btn getstarted scrollto"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mr-auto">
                <NavLink to="/thingstodo" style={{ textDecoration: "none" }}>
                  <li className="nav-item">
                    <button className="nav-link">Things To Do</button>
                  </li>
                </NavLink>
              </ul>
            </div>
            <ul className="navbar-nav ml-auto d-flex">
              <li className="nav-item">
                <button
                  style={{ textDecoration: "none" }}
                  className="btn getstarted scrollto"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
}
