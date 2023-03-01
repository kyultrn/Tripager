// import { useAuthContext } from "./accounts/Authenticator";
import { useNavigate } from "react-router-dom";
// import React, { useState, useEffect } from "react";
import { useGetTokenQuery } from "./store/ApiSlice";
import { useSelector } from "react-redux";
// import { useUserLogoutMutation } from "./store/ApiSlice";
import VideoPlayer from "./VideoCarousel";
import { store } from "./store/store";


export default function TripagerHome() {
  // const [logout] = useUserLogoutMutation()
  const navigate = useNavigate();
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

  const handleNotLoggedRedirect = () => {
    navigate("/signup");
  };



  const handleTripsRedirect = () => {
    navigate("/trips");
  };


    return (
      <>
        {token ? (
          <div>
            <h1>Tripager</h1>
            <h2>Plan and manage your next trip here!</h2>
            <div>
              <button className="btn btn-green" onClick={handleTripsRedirect}>
                My Trips
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h1>Tripager</h1>
            <h2>Plan and manage your next trip here!</h2>
            <div>
              <button className="btn btn-green" onClick={handleNotLoggedRedirect}>
                Get Started
              </button>
            </div>
          </div>
          )}
      </>
    )}
