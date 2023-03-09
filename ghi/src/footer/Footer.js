import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
  const selectedTripId = useSelector((state) => state.tripForm.selectedTripId)
  const location = useLocation()
  // const isTripsPage = [
  //   // "/trips",
  //   "/login",
  //   "/signup",
  //   "/myaccount",
  //   `/trips/${selectedTripId}/events`,
  // ].includes(location.pathname)

  return (
    <footer
      className="tripagerFooter my-custom-class text-white"
      // style={{ position: isTripsPage ? "fixed" : "relative" }}
    >
        <div className="footer-row row">
          <div className="footer-item">
            <h5>Tripager </h5>
            <h5 className="footer-rights">All rights reserved. Powered by Hack-Reactor</h5>
          </div>
      </div>
    </footer>
  );
}
