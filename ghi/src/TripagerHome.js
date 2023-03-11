import { useNavigate } from "react-router-dom";
import { useGetTokenQuery } from "./store/ApiSlice";
import VideoCarousel from "./VideoCarousel";
import React, { useEffect, useState } from "react";
import styles from "./TripagerHome.module.css"

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
                <div className="">
                  <img
                    src="https://ca.slack-edge.com/T040E31DKM2-U0454C7BHFU-99c4dd22836e-512"
                    className="img-fluids"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>Zach Dempsey</h4>
                  <span>Developer</span>
                  <p>
                    Zach Dempsey is a software engineer based in Dubuque, Iowa.
                    Zach is passionate about helping others and furthering his
                    education. When Zach isn't home working on a project, you
                    can find him doing maintenance for an Area Residential Care
                    apartment.
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
                <div className="">
                  <img
                    src="https://ca.slack-edge.com/T040E31DKM2-U0451DEU5NZ-c262217f78ab-512"
                    className="img-fluids"
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
                <div className="">
                  <img
                    src="https://ca.slack-edge.com/T040E31DKM2-U045YF9PLEL-1b6e4bb2be44-512"
                    className="img-fluids"
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
                <div className="">
                  <img
                    src="https://ca.slack-edge.com/T040E31DKM2-U04549KTVNX-f6da417b708b-512"
                    className="img-fluids"
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
          <div className="" data-aos="zoom-in" data-aos-delay="100">
            <div className="members d-flex align-items-start">
              <div className="pic">
                <img src="galv.png" className="img-fluid" alt=""></img>
              </div>
              <div className="member-info">
                <h4>Hack Reactor</h4>
                <p>
                  We chose the best boot camp on the market for a reason. Take a
                  look at what we've created and you'll understand why!
                </p>
                <div className="social">
                  <a
                    className="tech-link"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.hackreactor.com/"
                  >
                    Excalidraw.com
                  </a>
                </div>
              </div>
            </div>
          </div>
            <div className="" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="excalidraw.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>Excalidraw</h4>
                  <p>
                    We collaborated extensively during the development of
                    Tripager. Excalidraw was instrumental when wire-framing, and
                    kept the team on track when implementing design.
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
            <div className="" data-aos="zoom-in" data-aos-delay="200">
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
            <div className="" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="bootstrap.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>Bootstrap</h4>
                  <p>
                    We implemented Bootstrap for it's powerful and flexible
                    framework capabilities. We used native Bootstrap templates
                    as a jumping off point for many elements and were grateful
                    to have access to the library.
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
            <div className="" data-aos="zoom-in" data-aos-delay="200">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="react.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>React</h4>
                  <p>
                    Known for its simplicity, flexibility, reuseability and
                    performance, React's library did not dissapoint us. We used
                    React almost everywhere to build the seamless user
                    experience.
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
            <div className="" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="Fastapi.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>FastAPI</h4>
                  <p>
                    We used FastAPI to help us build our application quickly and
                    efficiently.
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
            <div className="" data-aos="zoom-in" data-aos-delay="200">
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
                    Using Yelp Fusion's API, Tripager users are able to search
                    for fun activities, create them as events and add them to
                    their trips.
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
            <div className="" data-aos="zoom-in" data-aos-delay="100">
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
                    We used Flat-Icon to spruce up our users interactive
                    experience when they delete and update events and trips.
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
            <div className="" data-aos="zoom-in" data-aos-delay="200">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img className="img-fluid" alt="" src="sweetalert.png"></img>
                </div>
                <div className="member-info">
                  <h4>Sweet Alert2</h4>
                  <p>
                    We were very excited to use fellow Hack Reactor alumni's
                    application to add flavor to our warning messages.
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
            <div className="" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="css.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>CSS</h4>
                  <p>
                    From the minor details to the big stuff, CSS styled Tripager
                    from top to bottom; using CSS allowed us to ensure that all
                    elements on the DOM looked cohesive and clean.
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
            <div className="" data-aos="zoom-in" data-aos-delay="200">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="redux.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>Redux </h4>
                  <p>
                    Redux was an essential technology in this application. Being
                    able to manage a global state was a game changer.
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
            <div className="" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="font.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>Font Awesome</h4>
                  <p>
                    Like it says in the title, we found some fonts, and they
                    were in fact, awesome.
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
            <div className="" data-aos="zoom-in" data-aos-delay="200">
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
            <div className="" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img src="canva.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  <h4>Canva</h4>
                  <p>
                    Canva was a helpful tool in brainstorming and re-sizing
                    images.
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
            <div className="" data-aos="zoom-in" data-aos-delay="100">
              <div className="members d-flex align-items-start">
                <div className="pic">
                  <img
                    src="data:image/png;base64,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"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  <h4>Swagger UI</h4>
                  <p>
                    Swagger UI was crucial in testing and debuggingg our API
                    endpoints.
                  </p>
                  <div className="social">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://swagger.io/tools/swagger-ui/"
                    >
                      Swagger.io
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
