import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Footer() {
  const selectedTripId = useSelector((state) => state.tripForm.selectedTripId);
  console.log(selectedTripId);
  const location = useLocation();
  const isTripsPage = [
    "/trips",
    "/login",
    "/signup",
    "/myaccount",
    `/trips/${selectedTripId}/events`,
  ].includes(location.pathname);

  return (
    <footer
      className="tripagerFooter my-custom-class text-white"
      style={{ position: isTripsPage ? "fixed" : "relative" }}
    >
      <div className=" py-3">
        <div className="footer-row row">
          <div className="footer-item col-md-4 mb-3">
            <h5>About Tripager</h5>
            <Link to="/about-tripager" className="btn text-white">
              Learn more
            </Link>
          </div>
          <div className="footer-item col-md-4 mb-3">
            <h5>About Developers</h5>
            <Link to="/about-developers" className="btn text-white">
              Meet the team
            </Link>
          </div>
          <div className="footer-item col-md-4 mb-3">
            <h5>Technologies</h5>
            <Link to="/technologies" className="btn text-white">
              View our tech stack
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
