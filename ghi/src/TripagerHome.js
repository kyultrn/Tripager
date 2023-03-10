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
                    Mischa Goodman is a software engineer based in NYC. Mischa
                    is passionate about lifting up female identifying artists in
                    technology and is currently working on a project to amplify
                    those voices in NYC.
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
            <div className="">
              <div className="" data-aos="zoom-in" data-aos-delay="100">
                <div className="aboutTrip">
                  Tripager is an application for planning and managing trips.
                  When users are logged in, they have access to trip-planning
                  functionalities: Trip Manager, Event Manager and have the
                  ability to add new events from Yelp to their scheduled events.
                  Users have the ability to create, update and delete both trips
                  and events. Users are able to search for activities,
                  restaurants, businesses, and more with Tripager's "Things to
                  do" feature. With just a search term and location, users are
                  able to see 12 of Yelp's top business hits for their intended
                  search. If users don't feel like choosing an activity, they
                  can input a location and play "Excursion Roulette". Tripager
                  will provide new and exciting choices for you!
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
                  <img
                    src="data:image/png;base64,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"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>Excalidraw</h4>
                  <p>
                    We collaborated extensively during the development of Tripager. Excalidraw was instrumental when wire-framing, and kept the team on track when implementing design.
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
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img
                    src="data:image/jpeg;base64,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"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>PostgreSQL</h4>
                  <p>
                    We opted for PostgreSQL to develop our database due to its
                    exceptional scalability and reliability.
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
          </div>
          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img
                    src="data:image/jpeg;base64,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"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>Bootstrap</h4>
                  <p>
                    We implemented Bootstrap for it's powerful and flexible
                    framework capabilities. We used native Bootstrap templates as a jumping off point for many elements and were grateful to have access to the library.
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
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="logo192.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>React</h4>
                  <p>
                    Known for its simplicity, flexibility, reuseability and performance, React's library did not dissapoint us. We used React almost everywhere to build the seamless user experience.
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
                  <h4>FastAPI</h4>
                  <p>
                    We used FastAPI to help us build our application quickly and efficiently.
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
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img
                    src="data:image/png;base64,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"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>YelpAPI</h4>
                  <p>
                    Using Yelp Fusion's API, Tripager users are able to search for fun activities, create them as events and add them to their trips.
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
                    We used Flat-Icon to spruce up our users interactive experience when they delete and update events and trips.
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
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img
                    src="data:image/png;base64,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"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>Sweet Alert2</h4>
                  <p>
                    We were very excited to use fellow Hack Reactor alumni's application to add flavor to our warning messages.
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
          </div>
          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8BhAGwDhxVE_t6WIQKwt_QxOP5HdoEgNZog&usqp=CAU"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>CSS</h4>
                  <p>
                   From the minor details to the big stuff, CSS styled Tripager from top to bottom; using CSS allowed us to ensure that all elements on the DOM looked cohesive and clean.
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
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img
                    src="data:image/png;base64,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"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>Redux </h4>
                  <p>
                    Redux was an essential technology in this application. Being able to manage a global state was a game changer.
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
          </div>
          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img
                    src="data:image/jpeg;base64,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"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>Font Awesome</h4>
                  <p>
                    Like it says in the title, we found some fonts, and they were in fact, awesome.
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
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img
                    src="https://www.9to5software.com/content/images/size/w500/2022/04/premiere-pro-user-interface-1.webp"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>Adobe Premier Pro</h4>
                  <p>
                    We opted for PostgreSQL to develop our database due to its
                    exceptional scalability and reliability.
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
          </div>
          <div className="row">
            <div className="col-lg-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img
                    src="data:image/jpeg;base64,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"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>Canva</h4>
                  <p>
                    Canva was a helpful tool in brainstorming and re-sizing images.
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
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img
                    src="data:image/png;base64,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"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>Hack Reactor</h4>
                  <p>We all chose the best boot camp on the market for a reason. Take a look at what we've created and you'll understand why!</p>
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
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
