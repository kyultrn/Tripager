// import { useAuthContext } from "./accounts/Authenticator";
import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
import { useGetTokenQuery } from './store/ApiSlice'
import { useSelector } from "react-redux";


export default TripagerHome;
function TripagerHome() {
  // const { token } = useAuthContext();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoaded, setIsLoaded] = useState(false);
  // console.log(token)

  const navigate = useNavigate();

  const handleNotLoggedRedirect = () => {
    navigate("/signup");
  };

  const handleLoggedInRedirect = () => {
    navigate("/trips");
  };
  const token = useSelector((state) => state.token)
  console.log(token)
  // const { data: tokenData, isLoading: tokenLoading } = useGetTokenQuery()
  // console.log(`this is tokenData: ${tokenData}`)
  // if (tokenLoading) {
  //   return <><progress className="progress is-primary" max="100"></progress></>;
  // }
  // useEffect(() => {
  //   if (token) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  //   setIsLoaded(true)
  // }, [token]);

  // if (!tokenLoading) {
  //   return <div>Loading...</div>;
  // }
  if (token){
    return (
      <div>
        <h1>Tripager</h1>
        <h2>Plan and manage your next trip here!</h2>
        <div>
            <button className="btn btn-green" onClick={handleLoggedInRedirect}>
              My Trips
            </button>
        </div>
      </div>
    );
  }else{
    return (
        <div>
          <h1>Tripager</h1>
          <h2>Plan and manage your next trip here!</h2>
          <div>
            <button className="btn btn-green" onClick={handleNotLoggedRedirect}>
              Get Started
            </button>
          </div>
        </div>
    )
  }
}
