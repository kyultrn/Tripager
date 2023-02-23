import { useToken } from "./Authenticator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { login } = useToken();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
    navigate("/");
    // possibly redirect to the trips page instead of the main page
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="row">
      <div className="p-3">
        <h1>Login</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              onChange={handleEmailChange}
              value={email}
              placeholder="Enter your email"
              required
              type="text"
              name="email"
              id="login_email"
              className="form-control"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handlePasswordChange}
              value={password}
              placeholder="Enter your password"
              required
              type="password"
              name="password"
              id="login_password"
              className="form-control"
            />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="btn btn-green">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
