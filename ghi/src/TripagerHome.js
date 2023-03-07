import { useNavigate } from "react-router-dom";
import { useGetTokenQuery } from "./store/ApiSlice";
import { useSelector } from "react-redux";
import VideoCarousel from "./VideoCarousel";
import React, { useEffect, useState } from "react";


export default function TripagerHome() {
  const navigate = useNavigate();
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("latitude: " + position.coords.latitude);
        console.log("longitude: " + position.coords.longitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const url = `${process.env.REACT_APP_TRIPAGER_HOST}/api/weather?latitude=${latitude}&longitude=${longitude}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setTemperature(data.current.temp_f);
          setIcon(data.current.condition.icon);
        })
        .catch((error) => console.log(error));
    }
  }, [latitude, longitude]);

  const handleNotLoggedRedirect = () => {
    navigate("/signup");
  };

  const handleTripsRedirect = () => {
    navigate("/trips");
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Tripager</h1>
        <h2>Plan and manage your next trip here.</h2>
        {/* {token ? (
          <div>
            <button className="btn btn-green" onClick={handleTripsRedirect}>

            </button>
          </div>
        ) : (
          <div>
            <button className="btn btn-green" onClick={handleNotLoggedRedirect}>
              Get Started
            </button>
          </div> */}
        {/* )} */}
      </div>
      {icon && temperature ? (
        <div>
          <img className="weatherIcon" src={icon}></img>
          <div className="temperature">{`${temperature}°`}</div>
        </div>
      ) : (
        <a>weather is loading</a>
      )}
      <VideoCarousel />
    </div>
  );
}
