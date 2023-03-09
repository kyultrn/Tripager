import React, { useEffect } from "react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
      console.log(data);
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
  ].includes(location.pathname);

  return (
    <nav
      id="navbar"
      className="navbar"
      style={{
        backgroundColor: isLoginOrSignUpPage ? "#413E3F" : "inherit",
        height: "80px",
      }}
    >
      <ul>
        {token ? (
          <>
            <li>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <button className="btn nav-link scrollto ">Tripager</button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/trips" style={{ textDecoration: "none" }}>
                <button className="btn nav-link scrollto">Trips</button>
              </NavLink>
            </li>
            <li>
              <NavLink to="/thingstodo" style={{ textDecoration: "none" }}>
                <button className="btn nav-link scrollto">Things To Do</button>
              </NavLink>
            </li>
            <li style={{ marginLeft: "auto" }}>
              <button
                style={{ textDecoration: "none" }}
                className="btn getstarted scrollto"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/" style={{ textDecoration: "none" }}>
                <button className="btn nav-link scrollto">Tripager</button>
              </NavLink>
            </li>
            <li style={{ marginLeft: "auto" }}>
              <button
                style={{ textDecoration: "none" }}
                className="btn getstarted scrollto"
                onClick={handleLogin}
              >
                Login
              </button>
            </li>
          </>
        )}
      </ul>
      <i className="bi bi-list mobile-nav-toggle"></i>
    </nav>
  );
}
