import { useNavigate } from "react-router-dom";
import { useGetTokenQuery } from "./store/ApiSlice";
import { useSelector } from "react-redux";
import VideoPlayer from "./VideoCarousel";

export default function TripagerHome() {
  const navigate = useNavigate();
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();

  const handleNotLoggedRedirect = () => {
    navigate("/signup");
  };

  const handleTripsRedirect = () => {
    navigate("/trips");
  };

  return (
    <div className="container">
      <VideoPlayer />
      <div className="content">
        <h1>Tripager</h1>
        <h2>Plan and manage your next trip here!</h2>
        {token ? (
          <div>
            <button className="btn btn-green" onClick={handleTripsRedirect}>
              My Trips
            </button>
          </div>
        ) : (
          <div>
            <button className="btn btn-green" onClick={handleNotLoggedRedirect}>
              Get Started
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
