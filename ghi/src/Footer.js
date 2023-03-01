import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="container py-3">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>About Tripager</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
              nulla sit amet odio facilisis dictum vel et nibh.
            </p>
            <Link to="/about-tripager" className="text-white">
              Learn more &raquo;
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <h5>About Developers</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
              nulla sit amet odio facilisis dictum vel et nibh.
            </p>
            <Link to="/about-developers" className="text-white">
              Meet the team &raquo;
            </Link>
          </div>
          <div className="col-md-4 mb-3">
            <h5>Technologies</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
              nulla sit amet odio facilisis dictum vel et nibh.
            </p>
            <Link to="/technologies" className="text-white">
              View our tech stack &raquo;
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
