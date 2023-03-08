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

console.log("location.pathname: ", location.pathname);


  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate('/login')
  }
  useEffect(() => {
    if (data) {
      console.log(data)
      // navigate('/login');
    }
  }, [data, navigate]);

  const handleLogin = () => {
    navigate("/login");
  };

  const isLoginOrSignUpPage = ["/login", "/signup", "/trips", `/trips/${selectedTripId}/events`, "/thingstodo"].includes(location.pathname);

    return (
        <nav id="navbar" className="navbar" style={{ backgroundColor: isLoginOrSignUpPage ? "#413E3F" : "inherit", height: "80px" }}>
          <ul>
            {token ? (
              <>
              <NavLink to="/" style={{ textDecoration: 'none' }}>
                <li><a className="nav-link scrollto ">Tripager</a></li>
              </NavLink>
              <NavLink to="/trips" style={{ textDecoration: 'none' }}>
                <li><a className="nav-link scrollto">Trips</a></li>
              </NavLink>
              <NavLink to="/thingstodo" style={{ textDecoration: 'none' }}>
                <li><a className="nav-link scrollto" >Things To Do</a></li>
              </NavLink>
                <li className="dropdown" ><a href="#" style={{ textDecoration: 'none', paddingLeft: '60px'}}><span>Account</span> <i className="bi bi-chevron-down"></i></a>
                  <ul>
                    <li><a href="#" style={{ textDecoration: 'none' }}>Edit Account</a></li>
                  </ul>
                </li>
              <li style={{marginLeft: '1250px'}}><a style={{textDecoration: 'none'}} className="getstarted scrollto" onClick={handleLogout} >Logout</a></li>
            </>
        ) : (
          <>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <li><a className="nav-link scrollto">Tripager</a></li>
            </NavLink>
            <li style={{marginLeft: '1650px'}}><a style={{textDecoration: 'none'}} className="getstarted scrollto" onClick={handleLogin} >Login</a></li>
          </>
          )}
          </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>
    );
}
