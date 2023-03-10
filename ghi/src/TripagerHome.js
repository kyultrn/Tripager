import { useNavigate } from "react-router-dom";
import { useGetTokenQuery } from "./store/ApiSlice";
import VideoCarousel from "./VideoCarousel";
import React, { useEffect, useState } from "react";
import styles from "./TripagerHome.module.css"
import { Link } from "react-router-dom";

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
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
    );
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      const url = `${process.env.REACT_APP_TRIPAGER_HOST}/api/weather?latitude=${latitude}&longitude=${longitude}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setTemperature(data.current.temp_f);
          setIcon(data.current.condition.icon);
        })
    }
  }, [latitude, longitude]);

  return (
    <React.Fragment>
      <section id="hero">
        {icon && temperature ? (
          <div>
            <img className="weatherIcon" src={icon}></img>
            <div className="temperature">{`${temperature}°`}</div>
          </div>
        ) : (
          <a>weather is loading</a>
        )}
        <div className={styles.hero_homepage_text}>
          <h1 className={`${styles.h1_homepage_text} text`}>Tripager</h1>
          <h2 className={`${styles.h2_homepage_text} text-center`}>
            Plan and manage your next trip here.
          </h2>
        </div>
        <VideoCarousel />
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
                    Zach Dempsey is a software engineer based in Dubuque, Iowa.
                    When he is not coding, you can find him at comedy shows and
                    finding the best pizza in town.
                  </p>
                  <div className="social">
                    <a target="_blank" href="https://gitlab.com/ZacharyD">
                      <i className="ri-instagram-fill"></i>
                    </a>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/zdempsey/"
                    >
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
                  <span>Developer</span>
                  <p>
                    Andrew Fockler is a software engineer based in Jupiter, FL.
                    When Andrew is not coding, you can find him at the gym or
                    making protein shakes.
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
                    Mischa Goodman is a NYC based software engineer. After
                    working as a professional actress and filmmaker for 10
                    years, Mischa transitioned into tech. Mischa is passionate
                    about lifting up female identifying artists in technology
                    and is currently working on a project to amplify those
                    voices in NYC.
                  </p>
                  <div className="social">
                    <a target="_blank" href="https://gitlab.com/mischadani2">
                      <i className="ri-instagram-fill"></i>
                    </a>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/mischadani/"
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
                    Kyle Tran is a software engineer based in Lowell, MA. Kyle
                    is passionate about helping fellow software engineers and
                    when he isn't working on a project, you can find him
                    consulting on other projects.
                  </p>
                  <div className="social">
                    <a target="_blank" href="https://gitlab.com/Kyull">
                      <i className="ri-instagram-fill"></i>
                    </a>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/kyle-trann/"
                    >
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
            <div className="row">
              <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
                <div className="member d-flex align-items-start">
                  Tripager is an application for planning and managing trips.
                  When users are logged in, they have access to all of the
                  trip-planning functionality that Tripager has to offer: Trip
                  Manager, Event Manager, the ability to add new events from
                  Yelp to their events, and more. When managing trips and
                  events, users have the opportunity to create, update and
                  delete. Users are able to search for activities, restaurants,
                  businesses, and more on the "Things to do" page. With just a
                  search term and a location, users are able to see 12 of Yelp's
                  top hits for their intended search. If users don't feel like
                  choosing an activity, they can input a location and play
                  "Excursion Roulette." Tripager will choose the top businesses
                  and display some brilliant and fun ideas for users and their
                  trip-mates.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* //Technologies */}
      <section id="technologies" className="team section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2 className="teamH2">Technologies</h2>
          </div>
          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="excalidraw.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>Excalidraw</h4>
                  <p>
                    We used Excalidraw in order to collaboratively design our
                    wireframe.
                  </p>
                  <div className="social">
                    <a
                      className="tech-link"
                      target="_blank"
                      rel="noreferrer"
                      href="https://excalidraw.com/"
                    >
                      Excalidraw.com
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
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="postgre.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>PostgreSQL</h4>
                  <p>
                    We opted for PostgreSQL to develop our database due to its
                    exceptional scalability and reliability.
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.postgresql.org/"
                    >
                      PostgreSQL.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="bootstrap.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>Bootstrap</h4>
                  <p>
                    We implemented Bootstrap for it's powerful and flexible
                    framework capabilities
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://getbootstrap.com/"
                    >
                      Bootstrap.com
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
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="react.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>React</h4>
                  <p>
                    We opted for PostgreSQL to develop our database due to its
                    exceptional scalability and reliability.
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://reactjs.org/"
                    >
                      React.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="Fastapi.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>FastAPI</h4>
                  <p>
                    We used Excalidraw in order to collaboratively design our
                    wireframe.
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://fastapi.tiangolo.com/"
                    >
                      FastAPI.tiangolo.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="200">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img
                    src="data:image/png;base64,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"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>Yelp fusion</h4>
                  <p>
                    We opted for PostgreSQL to develop our database due to its
                    exceptional scalability and reliability.
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://docs.developer.yelp.com/"
                    >
                      Yelpfusion.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img
                    src="data:image/png;base64,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"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>Flat-Icon</h4>
                  <p>
                    We used Excalidraw in order to collaboratively design our
                    wireframe.
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.flaticon.com/"
                    >
                      Flaticon.com
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
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img className="img-fluid" alt="" src="sweetalert.png"></img>
                </div>
                <div className="member-info">
                  <h4>Sweet Alert</h4>
                  <p>
                    We opted for PostgreSQL to develop our database due to its
                    exceptional scalability and reliability.
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://sweetalert2.github.io/"
                    >
                      SweetAlert2.github
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="css.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>CSS</h4>
                  <p>
                    We used Excalidraw in order to collaboratively design our
                    wireframe.
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.w3schools.com/css/"
                    >
                      W3schools.com
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
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="redux.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>Redux </h4>
                  <p>
                    We opted for PostgreSQL to develop our database due to its
                    exceptional scalability and reliability.
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://redux.js.org/"
                    >
                      Redux.js.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="font.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>Font Awesome</h4>
                  <p>
                    We used Excalidraw in order to collaboratively design our
                    wireframe.
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://fontawesome.com/"
                    >
                      FontAwesome.com
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
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="docker.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>Adobe Premier Pro</h4>
                  <p>
                    We opted for PostgreSQL to develop our database due to its
                    exceptional scalability and reliability.
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.adobe.com/products/premiere.html"
                    >
                      Adobe.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="canva.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>Canva</h4>
                  <p>
                    We used Excalidraw in order to collaboratively design our
                    wireframe.
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.canva.com/"
                    >
                      Canva.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="200">
              <div className="members tech-padding d-flex align-items-start">
                <div className="pic">
                  <img src="galv.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>Hack Reactor</h4>
                  <p>
                    We chose the best boot camp on the market for a reason. Take
                    a look at what we've created and you'll understand why!
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.hackreactor.com/"
                    >
                      HackReactor.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
