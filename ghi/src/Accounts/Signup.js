import { useToken } from "./authenticator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUp() {
  const { signup } = useToken();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(formData.name, formData.email, formData.password);
    navigate("/");
    // possibly redirect to the trips page instead of the main page
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="row">
      <div className="p-3">
        <h1>Create an Account</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              value={formData.name}
              placeholder="Enter your name"
              required
              type="text"
              name="name"
              id="login_name"
              className="form-control"
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              value={formData.email}
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
              onChange={handleFormChange}
              value={formData.password}
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
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
