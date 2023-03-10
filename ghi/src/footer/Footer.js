import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
  const selectedTripId = useSelector((state) => state.tripForm.selectedTripId)
  const location = useLocation()
  const isTripsPage = [
    "/login",
    "/signup",
    "/thingstodo",
    `/trips/${selectedTripId}/events`,
  ].includes(location.pathname)

  const isBusinessDataFetched = useSelector(
    (state) => state.eventForm.businessDataFetched
  );
  console.log(isBusinessDataFetched)

  return (
    <footer
      className="tripagerFooter my-custom-class text-white"
      style={{
        position: isTripsPage ? "fixed" : "relative",
        position: isBusinessDataFetched ? "relative" : "fixed",
      }}
    >
      <div className="footer-row row">
        <div className="footer-item">
          <h5>Tripager </h5>
          <h5 className="footer-rights">
            All rights reserved. Powered by Hack-Reactor
          </h5>
        </div>
      </div>
    </footer>
  );
}
