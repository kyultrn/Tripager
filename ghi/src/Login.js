import { useToken, login } from "./Authenticator";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Login() {
  const { token, login } = useToken()

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const handleSubmit = () => {
    login(email, password)
    navigate("/")
  }

  return (
    <div className="row">
      <div className="p-3">
        <h1>Login</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input value={email} placeholder="Enter your username" required type="text" name="email" id="login_email" className="form-control" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input value={password} placeholder="Enter your password" required type="password" name="password" id="login_password" className="form-control" />
            <label htmlFor="password">Password</label>
          </div>
            <button type="submit" className="btn btn-green">
              Login
            </button>
        </form>
      </div>
    </div>
  )


}
