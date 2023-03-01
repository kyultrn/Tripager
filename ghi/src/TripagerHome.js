// import { useAuthContext } from "./accounts/Authenticator";
import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
import { useGetTokenQuery } from "./store/apiSlice";
import { useSelector } from "react-redux";
// import { useUserLogoutMutation } from "./store/ApiSlice";
import VideoPlayer from "./VideoCarousel";

export default function TripagerHome() {
  // const [logout] = useUserLogoutMutation()
  const navigate = useNavigate();
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

  const handleNotLoggedRedirect = () => {
    navigate("/signup");
  };

  // const handleLogout = (e) => {
  //   e.preventDefault()
  //   logout()
  // }

  const handleTripsRedirect = () => {
    navigate("/trips");
  };
  // const token = useSelector((state) => state.token)
  // console.log(token)
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
  if (!token) {
    return (
      <div>
        <VideoPlayer />
        <h1>Tripager</h1>
        <h2>Plan and manage your next trip here!</h2>
        <div>
          <button className="btn btn-green" onClick={handleNotLoggedRedirect}>
            Get Started
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <VideoPlayer />
        <h1>Tripager</h1>
        <h2>Plan and manage your next trip here!</h2>
        <div>
          <button className="btn btn-green" onClick={handleTripsRedirect}>
            My Trips
          </button>
        </div>
      </div>
    );
  }
}
