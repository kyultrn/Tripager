// import { useToken } from "./Authenticator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AboutDevelopers() {

  const [stars, setStars] = useState(1);
//   const token = useToken();
  const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/login");
//     token.logout();
//   };

  return (
    <div className="about-container">
      <h1 className="title">About the Developers</h1>
      <div className="image-container">
        <div>
          <img
            src="https://ca.slack-edge.com/T040E31DKM2-U0454C7BHFU-99c4dd22836e-512"
            alt="developer"
          />
          <p className="name">Zach Dempsey</p>
          <p className="bio">Command Base</p>
        </div>
        <div>
          <img
            src="https://ca.slack-edge.com/T040E31DKM2-U0451DEU5NZ-c262217f78ab-512"
            alt="developer"
          />
          <p className="name">Andrew Fockler</p>
        </div>
        <div>
          <img
            src="https://ca.slack-edge.com/T040E31DKM2-U045YF9PLEL-1b6e4bb2be44-512"
            alt="developer"
          />
          <p className="name">Mischa Goodman</p>
        </div>
        <div>
          <img
            src="https://ca.slack-edge.com/T040E31DKM2-U04549KTVNX-f6da417b708b-512"
            alt="developer"
          />
          <p className="name">Kyle Tran</p>
        </div>
      </div>
    </div>
  );
}
