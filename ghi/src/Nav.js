import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useToken } from "./accounts/Authenticator";
import { useAuthContext } from "./accounts/Authenticator";
import { useGetTokenQuery, useUserLogoutMutation } from "./store/ApiSlice";
import { useDispatch } from "react-redux";
import { setLoginState, resetFormData } from "./store/AccountsSlice";
import { store } from "./store/store";


export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useUserLogoutMutation();
  const { data: token } = useGetTokenQuery();
  const handleLogout = (e) => {
    dispatch(setLoginState(false));
    e.preventDefault();
    console.log("yes");
    logout();
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  console.log(store.getState().loggedIn.logged)

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <span className="tripager">Tripager</span>
          </NavLink>
          <div>
            {store.getState().loggedIn.logged ? (
              <>
              <NavLink className="navbar-brand" to="/trips">
                <span className="trips">Trips</span>
              </NavLink>
              <NavLink className="navbar-brand" to="/thingstodo">
                <span className="thingstodo">Things To Do</span>
              </NavLink>
              <button className="btn btn-green" onClick={handleLogout}>
                Log Out
              </button>
              </>
            ) : (
              <button className="btn btn-green" onClick={handleLogin}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    );
  // } else {
  //   return (
  //     <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  //       <div className="container-fluid">
  //         <NavLink className="navbar-brand" to="/">
  //           <span className="tripager">Tripager</span>
  //         </NavLink>
  //         {/* <NavLink className="navbar-brand" to="/trips">
  //           <span className="trips">Trips</span>
  //         </NavLink>
  //         <NavLink className="navbar-brand" to="/thingstodo">
  //           <span className="thingstodo">Things To Do</span>
  //         </NavLink> */}
  //         <div>
  //           <button className="btn btn-green" onClick={handleLogin}>
  //             Login
  //           </button>
  //         </div>
  //       </div>
  //     </nav>
  //   );
  // }
  // return(      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
  //       <div className="container-fluid">
  //         <NavLink className="navbar-brand" to="/">
  //           <span className="tripager">Tripager</span>
  //         </NavLink>
  //       {token?(
  //         <>
  //         <NavLink className="navbar-brand" to="/trips">
  //           <span className="trips">Trips</span>
  //         </NavLink>
  //         <NavLink className="navbar-brand" to="/thingstodo">
  //           <span className="thingstodo">Things To Do</span>
  //         </NavLink>
  //         <div>
  //           <Link to={'/login'}>
  //             <button className="btn btn-green" onClick={logout}>
  //               Logout
  //             </button>
  //           </Link>
  //         </div></>):(
  //         <button className="btn btn-green" onClick={handleLogin}>
  //           Login
  //         </button>)
  //     }
  //       </div>
  //     </nav>)
}
