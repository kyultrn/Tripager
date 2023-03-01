import React from "react";
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
  const [logout, result] = useUserLogoutMutation();
  const { data: token } = useGetTokenQuery();

  console.log("token", token);

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   console.log("yes");
  //   logout().then(() => {
  //     console.log("logout successful");
  //     console.log("token should be null", token);
  //     if(!token){
  //       console.log('token is gone')
  //       navigate("/login");
  //     }
  //   })
  // }

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    navigate('/login')
  }

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   logout()
  // };
  // if (result.isSuccess) {
  //   navigate('/login')
  // } else {
  //   console.log("didn't work breh")
  // }

  const handleLogin = () => {
    navigate("/login");
  };

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <span className="tripager">Tripager</span>
          </NavLink>
          <div>
            {token ? (
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
}
