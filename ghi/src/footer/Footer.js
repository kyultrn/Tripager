import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
  const selectedTripId = useSelector((state) => state.tripForm.selectedTripId)
  const location = useLocation()
  const isTripsPage = [
    "/trips",
    "/login",
    "/signup",
    "/myaccount",
    `/trips/${selectedTripId}/events`,
  ].includes(location.pathname)

  return (
    <footer
      className="tripagerFooter my-custom-class text-white"
      style={{ position: isTripsPage ? "fixed" : "relative" }}
    >
      <div className=" py-3">
        <div className="footer-row row">
          <div className="footer-item col-md-4 mb-3">
            <h5>FOOTER </h5>
          </div>
        </div>
      </div>
    </footer>
  );
}
