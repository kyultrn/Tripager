import React, {useEffect} from "react";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { useToken } from "./accounts/Authenticator";
import { useAuthContext } from "./accounts/Authenticator";
import { useGetTokenQuery, useUserLogoutMutation } from "./store/ApiSlice";
import { useDispatch } from "react-redux";
import { setLoginState, resetFormData } from "./store/AccountsSlice";
import { store } from "./store/store";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const [logout, { data } ] = useUserLogoutMutation();
  const hideNavBarPaths = ["/login", "/signup"];





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

  const showNavBar = !hideNavBarPaths.includes(location.pathname);

  if (!showNavBar) {
    return null;
  }

    return (
      // <nav className="navbar navbar-expand-lg navbar-dark my-custom-class">
      //   <div className="container-fluid">
      //     <NavLink className="navbar-brand" to="/">
      //       <span className="tripager">Tripager</span>
      //     </NavLink>
      //     <div>
      //       {token ? (
      //         <>
      //           <NavLink className="navbar-brand" to="/trips">
      //             <span className="trips">Trips</span>
      //           </NavLink>
      //           <NavLink className="navbar-brand" to="/thingstodo">
      //             <span className="thingstodo">Things To Do</span>
      //           </NavLink>
      //           <button className="btn btn-green" onClick={handleLogout}>
      //             Log Out
      //           </button>
      //         </>
      //       ) : (
      //         <button className="btn btn-green" onClick={handleLogin}>
      //           Login
      //         </button>
      //       )}
      //     </div>
      //   </div>
      // </nav>

      // <nav id="navbar" className="navbar">
      //   <ul>
      //     {token ? (
      //       <>
      //       <NavLink className="nav-link scrollto" to="/trips">Home</NavLink>
      //       <NavLink className="nav-link scrollto" to="/trips">Trips</NavLink>
      //       <NavLink className="nav-link scrollto" to="/thingstodo"> Things To Do</NavLink>
      //       <NavLink className="getstarted scrollto right" to="/logout" onClick={handleLogout}>Logout</NavLink>
      //       </>
      //     ) : (
      //       <NavLink className="getstarted scrollto right" to="/login">Login</NavLink>
      //     )}
      //   </ul>
      //   <i className="bi bi-list mobile-nav-toggle"></i>
      // </nav>

        <nav id="navbar" className="navbar">
        <ul>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <li><a className="nav-link scrollto ">Tripager</a></li>
          </NavLink>
          <NavLink to="/trips" style={{ textDecoration: 'none' }}>
            <li><a className="nav-link scrollto">Trips</a></li>
          </NavLink>
          <NavLink to="/trips" style={{ textDecoration: 'none' }}>
            <li><a className="nav-link scrollto" href="/thingstodo">Things To Do</a></li>
          </NavLink>
            <li className="dropdown" ><a href="#" style={{ textDecoration: 'none', paddingLeft: '60px'}}><span>Account</span> <i className="bi bi-chevron-down"></i></a>
              <ul>
                <li><a href="#" style={{ textDecoration: 'none' }}>My Account</a></li>
                {/* <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i class="bi bi-chevron-right"></i></a>
                  <ul>
                  <li><a href="#">Deep Drop Down 1</a></li>
                  </ul>
                </li> */}
              </ul>
            </li>
          <li style={{paddingLeft: '1250px'}}><a style={{textDecoration: 'none'}} className="getstarted scrollto" onClick={handleLogout} >Logout</a></li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>
    );
}
