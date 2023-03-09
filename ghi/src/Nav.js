import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { useGetTokenQuery, useUserLogoutMutation } from "./store/ApiSlice";
import { useDispatch } from "react-redux";


export default function Navbar() {
  const selectedTripId = useSelector(state => state.tripForm.selectedTripId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const [logout, { data } ] = useUserLogoutMutation();


  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate('/login')
  }
  useEffect(() => {
    if (data) {
    }
  }, [data, navigate]);

  const handleLogin = () => {
    navigate("/login");
  };

  const isLoginOrSignUpPage = ["/login", "/signup", "/trips", `/trips/${selectedTripId}/events`, "/thingstodo", "/myaccount"].includes(location.pathname);

    return (
      // <nav id="navbar" className="navbar" style={{ backgroundColor: isLoginOrSignUpPage ? "#413E3F" : "inherit", height: "80px" }}>
      //   <ul>
      //     {token ? (
      //       <>
      //       <NavLink to="/" style={{ textDecoration: 'none' }}>
      //         <li><span className="btn nav-link scrollto ">Tripager</span></li>
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
              <NavLink to="/thingstodo" style={{ textDecoration: "none" }}>
                <li>
                  <button className="btn nav-link scrollto">Things To Do</button>
                </li>
              </NavLink>
              <li className="dropdown">
                <button
                  className="btn"
                  href="#"
                  style={{ textDecoration: "none", paddingLeft: "60px" }}
                >
                  <span>Account</span> <i className="bi bi-chevron-down"></i>
                </button>
                <ul>
                  <li>
                    <NavLink to="/myaccount" style={{ textDecoration: "none" }}>
                      <button
                        className="btn"
                        href="#"
                        style={{ textDecoration: "none" }}
                      >
                        My Account
                      </button>
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li style={{ marginLeft: "1250px" }}>
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
              <li style={{ marginLeft: "1650px" }}>
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
