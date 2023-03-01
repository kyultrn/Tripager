// import { useAuthContext } from "./accounts/Authenticator";
import { useNavigate } from "react-router-dom";
import { useGetTokenQuery } from "./store/authApi";
import VideoCarousel from "./VideoCarousel";

export default function TripagerHome() {
  const navigate = useNavigate();
  const { data: tokenData } = useGetTokenQuery();
  if (!tokenData) {
    return (
      <div>
        <VideoCarousel />
        <div>
          <button className="btn btn-green">
            Get Started
          </button>
        </div>
      </div>
    );
  } else if (!tokenData) {
    return (
      <div>
        <VideoCarousel />
        <div>
          <button className="btn btn-green">
            My Trips
          </button>
        </div>
      </div>
    );
  }
}
