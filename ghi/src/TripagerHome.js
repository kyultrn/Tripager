import { useNavigate } from "react-router-dom";
import { useGetTokenQuery } from "./store/ApiSlice";
import { useSelector } from "react-redux";
import VideoCarousel from "./VideoCarousel";
import React, { useEffect, useState } from "react";
import Trips from "./trips/Trips";
import Footer from "./footer/Footer";


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
        // console.log("latitude: " + position.coords.latitude);
        // console.log("longitude: " + position.coords.longitude);
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
          console.log(data);
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
      <React.Fragment>
        <section id="hero" className="d-flex align-items-center">
          {icon && temperature ? (
            <div>
              <img className="weatherIcon" src={icon}></img>
              <div className="temperature">{`${temperature}°`}</div>
            </div>
          ) : (
            <a>weather is loading</a>
          )}
          <VideoCarousel />
          <div className="container">
            <div className="row">
              <div
                className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <h1>Better Solutions For Your Business</h1>
                <h2>
                  We are team of talented designers making websites with Bootstrap
                </h2>
                <div className="d-flex justify-content-center justify-content-lg-start">
                  <a href="#about" className="btn-get-started scrollto">
                    Get Started
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=jDDaplaOz7Q"
                    className="glightbox btn-watch-video"
                  >
                    <i className="bi bi-play-circle"></i>
                    <span>Watch Video</span>
                  </a>
                </div>
              </div>
              <div
                className="col-lg-6 order-1 order-lg-2 hero-img"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <img
                  src="assets/img/hero-img.png"
                  className="img-fluid animated"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </section>

        {/* team section */}
        <section id="team" className="team section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2 className="teamH2">Team</h2>
            </div>

            <div className="row">
              <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
                <div className="member d-flex align-items-start">
                  <div className="pic">
                    <img
                      src="https://ca.slack-edge.com/T040E31DKM2-U0454C7BHFU-99c4dd22836e-512"
                      className="img-fluid"
                      alt=""
                    ></img>
                  </div>
                  <div className="member-info">
                    <h4>Zach Dempsey</h4>
                    <span>Developer</span>
                    <p>
                      Explicabo voluptatem mollitia et repellat qui dolorum quasi
                    </p>
                    <div className="social">
                      <a target="_blank" href="">
                        <i className="ri-instagram-fill"></i>
                      </a>
                      <a target="_blank" href="">
                        {" "}
                        <i className="ri-linkedin-box-fill"></i>{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-6 mt-4 mt-lg-0"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="member d-flex align-items-start">
                  <div className="pic">
                    <img
                      src="https://ca.slack-edge.com/T040E31DKM2-U0451DEU5NZ-c262217f78ab-512"
                      className="img-fluid"
                      alt=""
                    ></img>
                  </div>
                  <div className="member-info">
                    <h4>Andrew Fockler</h4>
                    <span>Noob</span>
                    <p>
                      Explicabo voluptatem mollitia et repellat qui dolorum quasi
                    </p>
                    <div className="social">
                      <a target="_blank" href="https://gitlab.com/Afockler4">
                        <i className="ri-instagram-fill"></i>
                      </a>
                      <a
                        target="_blank"
                        href="https://www.linkedin.com/in/andrew-fockler/"
                      >
                        {" "}
                        <i className="ri-linkedin-box-fill"></i>{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-6 mt-4"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className="member d-flex align-items-start">
                  <div className="pic">
                    <img
                      src="https://ca.slack-edge.com/T040E31DKM2-U045YF9PLEL-1b6e4bb2be44-512"
                      className="img-fluid"
                      alt=""
                    ></img>
                  </div>
                  <div className="member-info">
                    <h4>Mischa Goodman</h4>
                    <span>Developer</span>
                    <p>
                      Explicabo voluptatem mollitia et repellat qui dolorum quasi
                    </p>
                    <div className="social">
                      <a target="_blank" href="">
                        <i className="ri-instagram-fill"></i>
                      </a>
                      <a target="_blank" href="">
                        {" "}
                        <i className="ri-linkedin-box-fill"></i>{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-6 mt-4"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="member d-flex align-items-start">
                  <div className="pic">
                    <img
                      src="https://ca.slack-edge.com/T040E31DKM2-U04549KTVNX-f6da417b708b-512"
                      className="img-fluid"
                      alt=""
                    ></img>
                  </div>
                  <div className="member-info">
                    <h4>Kyle Tran</h4>
                    <span>Developer</span>
                    <p>
                      Explicabo voluptatem mollitia et repellat qui dolorum quasi
                    </p>
                    <div className="social">
                      <a target="_blank" href="">
                        <i className="ri-instagram-fill"></i>
                      </a>
                      <a target="_blank" href="">
                        {" "}
                        <i className="ri-linkedin-box-fill"></i>{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* //About tripager */}
        <section id="aboutTripager" className="team section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2 className="teamH2">About Tripager</h2>
            </div>
          </div>
        </section>

        {/* //Technologies */}
        <section id="technologies" className="team section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2 className="teamH2">Technologies</h2>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
}
