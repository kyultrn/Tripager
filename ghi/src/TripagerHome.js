import { useNavigate } from "react-router-dom";
import { useGetTokenQuery } from "./store/ApiSlice";
import VideoCarousel from "./VideoCarousel";
import React, { useEffect, useState } from "react";
import styles from "./TripagerHome.module.css"
// import paper_airplane from "./paper_airplane.png"
import plane from "./plane.png"

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
          <img className="plane-image" src={plane} alt="Plane Image"></img>
          <h1 className={`${styles.h1_homepage_text} text`}>Tripager</h1>
          <h2 className={`${styles.h2_homepage_text} text-center`}>
            Plan and manage your next trip here.
          </h2>
        </div>
        <div></div>
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
                      <i className="btn ri-instagram-fill"></i>
                    </a>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/zdempsey/"
                    >
                      {" "}
                      <i className="btn ri-linkedin-box-fill"></i>{" "}
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
                      <i className="btn ri-instagram-fill"></i>
                    </a>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/andrew-fockler/"
                    >
                      {" "}
                      <i className="btn ri-linkedin-box-fill"></i>{" "}
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
                      <i className="btn ri-instagram-fill"></i>
                    </a>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/mischadani/"
                    >
                      {" "}
                      <i className="btn ri-linkedin-box-fill"></i>{" "}
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
                      <i className="btn ri-instagram-fill"></i>
                    </a>
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/kyle-trann/"
                    >
                      {" "}
                      <i className="btn ri-linkedin-box-fill"></i>{" "}
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
      {/* //About tripager */}
      <section id="aboutTripager" className="team section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2 className="teamH2">Latest Ad</h2>
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
            <div className="members2 d-flex align-items-start">
              <div className="pic">
                <img src="6_Fastapi.png" className="img-fluid" alt=""></img>
              </div>
              <div className="member-info">
                {/* <h4>FastAPI</h4> */}
                <p>
                  <span class="bolded">FastAPI</span> was used to build the back
                  end of our application quickly and efficiently.
                </p>
                <div className="social">
                  {/* <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://fastapi.tiangolo.com/"
                    >
                      FastAPI.tiangolo.com
                    </a> */}
                </div>
              </div>
            </div>
          </div>
          <div className="" data-aos="zoom-in" data-aos-delay="200">
            <div className="members2 d-flex align-items-start">
              <div className="pic">
                <img src="7_postgres.png" className="img-fluid2" alt=""></img>
              </div>
              <div className="member-info">
                {/* <h4>PostgreSQL</h4> */}
                <p>
                  <span class="bolded">PostgreSQL</span> was our database sysyem
                  of choice due to ts exceptional scalability and reliability.
                </p>
                <div className="social">
                  {/* <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.postgresql.org/"
                    >
                      PostgreSQL.org
                    </a> */}
                </div>
              </div>
            </div>
          </div>
          <div className="" data-aos="zoom-in" data-aos-delay="200">
            <div className="members2 d-flex align-items-start">
              <div className="pic">
                <img src="12_react.png" className="img-fluid" alt=""></img>
              </div>
              <div className="member-info">
                {/* <h4>React</h4> */}
                <p>
                  <span class="bolded">React</span>, known for simplicity,
                  flexibility and performance, didn't dissapoint. It is used on
                  almost every page to create a seamless user experience.
                </p>
                <div className="social">
                  {/* <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://reactjs.org/"
                    >
                      React.org
                    </a> */}
                </div>
              </div>
            </div>
          </div>
          <div className="" data-aos="zoom-in" data-aos-delay="200">
            <div className="members2 d-flex align-items-start">
              <div className="pic">
                <img src="2_redux.png" className="img-fluid" alt=""></img>
              </div>
              <div className="member-info">
                {/* <h4>Redux </h4> */}
                <p>
                  <span class="bolded">Redux</span> was an essential technology
                  used in this app; managing global state was a game changer.
                </p>
                <div className="social">
                  {/* <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://redux.js.org/"
                    >
                      Redux.js.org
                    </a> */}
                </div>
              </div>
            </div>
          </div>
          <div className="" data-aos="zoom-in" data-aos-delay="100">
            <div className="members2 d-flex align-items-start">
              <div className="pic">
                <img src="8_bootstrap.png" className="img-fluid" alt=""></img>
              </div>
              <div className="member-info">
                {/* <h4>Bootstrap</h4> */}
                <p>
                  <span class="bolded">Bootstrap</span> was implemented for it's
                  powerful framework capabilities. We used native templates as
                  jumping off points for many elements.
                </p>
                <div className="social">
                  {/* <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://getbootstrap.com/"
                    >
                      Bootstrap.com
                    </a> */}
                </div>
              </div>
            </div>

            <div className="" data-aos="zoom-in" data-aos-delay="200">
              <div className="members2 d-flex align-items-start">
                <div className="pic">
                  <img src="3_yelp.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  {/* <h4>Yelp Fusion</h4> */}
                  <p>
                    <span class="bolded">Yelp Fusion API</span> was an
                    outstanding API. Tripager users are able to search for fun
                    activities and create events using Yelp Fusion data.
                  </p>
                  <div className="social">
                    {/* <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://docs.developer.yelp.com/"
                    >
                      Yelpfusion.com
                    </a> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="" data-aos="zoom-in" data-aos-delay="100">
              <div className="members2 d-flex align-items-start">
                <div className="pic">
                  <img src="13_css.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  {/* <h4>CSS</h4> */}
                  <p>
                    <span class="bolded">CSS</span> allowed us to ensure that
                    all elements on the DOM looked cohesive and clean. We used
                    CSS to style Tripager from top to bottom!
                  </p>
                  <div className="social">
                    {/* <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.w3schools.com/css/"
                    >
                      W3schools.com
                    </a> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="" data-aos="zoom-in" data-aos-delay="200">
              <div className="members2 d-flex align-items-start">
                <div className="pic">
                  <img src="10_docker.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  {/* <h4>Docker</h4> */}
                  <p>
                    <span class="bolded">Docker</span> ensured the application
                    development environment was standardized for each engineer.
                  </p>
                  <div className="social">
                    {/* <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.adobe.com/products/premiere.html"
                    >
                      Adobe.com
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="" data-aos="zoom-in" data-aos-delay="100">
              <div className="members2 d-flex align-items-start">
                <div className="pic">
                  <img src="15_swagger.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  {/* <h4>Swagger UI</h4> */}
                  <p>
                    <span class="bolded">Swagger UI</span> was crucial in
                    testing and debuggingg our API endpoints.
                  </p>
                  <div className="social">
                    {/* <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://swagger.io/tools/swagger-ui/"
                    >
                      Swagger.io
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="" data-aos="zoom-in" data-aos-delay="200">
              <div className="members2 d-flex align-items-start">
                <div className="pic">
                  <img
                    className="img-fluid"
                    alt=""
                    src="14_sweetalert.png"
                  ></img>
                </div>
                <div className="member-info">
                  {/* <h4>Sweet Alert2</h4> */}
                  <p>
                    <span class="bolded">SweetAlert2</span>, fellow Hack Reactor
                    alumni's application, adds flavor to our warning messages.
                  </p>
                  <div className="social">
                    {/* <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://sweetalert2.github.io/"
                    >
                      SweetAlert2.github
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="" data-aos="zoom-in" data-aos-delay="100">
              <div className="members2 d-flex align-items-start">
                <div className="pic">
                  <img src="5_flaticon.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  {/* <h4>Flat-Icon</h4> */}
                  <p>
                    <span class="bolded">Flat-Icon</span> was used to spruce up
                    the interactive user experience.
                  </p>
                  <div className="social">
                    {/* <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.flaticon.com/"
                    >
                      Flaticon.com
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="" data-aos="zoom-in" data-aos-delay="100">
              <div className="members2 d-flex align-items-start">
                <div className="pic">
                  <img
                    src="9_Excalidraw.png"
                    className="img-fluid"
                    alt=""
                  ></img>
                </div>
                <div className="member-info">
                  {/* <h4>Excalidraw</h4> */}
                  <p>
                    <span class="bolded">Excalidraw</span>
                    was instrumental when creating the wire-frame for Tripager.
                  </p>
                  <div className="social">
                    {/* <a
                      className="tech-link"
                      target="_blank"
                      rel="noreferrer"
                      href="https://excalidraw.com/"
                    >
                      Excalidraw.com
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="" data-aos="zoom-in" data-aos-delay="100">
              <div className="members2 d-flex align-items-start">
                <div className="pic">
                  <img src="4_font.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  {/* <h4>Font Awesome</h4> */}
                  <p>
                    <span class="bolded">Font Awesome</span>'s fonts were just
                    like the name implies, they were in fact, awesome.
                  </p>
                  <div className="social">
                    {/* <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://fontawesome.com/"
                    >
                      FontAwesome.com
                    </a> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="" data-aos-delay="100">
              <div className="members2 d-flex align-items-start">
                <div className="pic">
                  <img src="11_canva.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  {/* <h4>Canva</h4> */}
                  <p>
                    <span class="bolded">Canva</span> was a helpful tool in
                    brainstorming ideas, collaging and re-sizing images.
                  </p>
                  <div className="social">
                    {/* <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.canva.com/"
                    >
                      Canva.com
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="" data-aos-delay="100">
              <div className="members2 d-flex align-items-start">
                <div className="pic">
                  <img src="1_HR.png" className="img-fluid" alt=""></img>
                </div>
                <div className="member-info">
                  {/* <h4>Hack Reactor</h4> */}
                  <p>
                    <span class="bolded">Hack Reactor</span> is the best boot
                    camp on the market for a reason. Take a look at what we've
                    created and you'll understand why!
                  </p>
                  <div className="social">
                    {/* <a
                    className="tech-link"
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.hackreactor.com/"
                  >
                    Hackreactor.com
                  </a> */}
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
