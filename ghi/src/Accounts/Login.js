import { useToken } from "./Authenticator";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserLoginMutation } from "../store/apiSlice";
import { updateFormData } from "../store/accountsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  // const { login } = useToken();

  const navigate = useNavigate();
  const email = useSelector((state) => state.loginForm.email);
  const password = useSelector((state) => state.loginForm.password);
  const [login] = useUserLoginMutation();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ login });
    login({ email, password });
    navigate("/");
    // possibly redirect to the trips page instead of the main page
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ name, value }));
  };

  // const handlePasswordChange = (e) => {
  //   dispatch(setPassword(e.target.value));
  // };

  return (
    <div className="row">
      <div className="p-3">
        <h1>Login</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
