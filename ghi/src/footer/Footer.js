import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {

  const location = useLocation()
  const isTripsPage = ['/trips', '/login', '/signupo'].includes(location.pathname)

  return (
    <footer className="tripagerFooter my-custom-class text-white" style={{ position: isTripsPage ? "fixed" : "relative" }}>
      <div className=" py-3">
        <div className="footer-row row">
          <div className="footer-item col-md-4 mb-3">
            <h5>About Tripager</h5>
            <p>about our project</p>
            <Link to="/about-tripager" className="text-white">
              Learn more
            </Link>
          </div>
          <div className="footer-item col-md-4 mb-3">
            <h5>About Developers</h5>
            <p>about our team</p>
            <Link to="/about-developers" className="text-white">
              Meet the team
            </Link>
          </div>
          <div className="footer-item col-md-4 mb-3">
            <h5>Technologies</h5>
            <p>fast-api, redux, etc</p>
            <Link to="/technologies" className="text-white">
              View our tech stack
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
