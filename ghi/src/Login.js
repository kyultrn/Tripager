import { useToken, login } from "./Authenticator";
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
  const { token, login } = useToken()

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const handleSubmit = () => {
    login(email, password)
    navigate("/MainPage")
  }

  return (
    <>
    <button>{login()}</button>
    </>
  )

}


export default Login;
