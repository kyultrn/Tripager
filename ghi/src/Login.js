import { useToken, login } from "./Authenticator";
import { useNavigate } from 'react-router-dom'

function Login() {
  const { token, login } = useToken()

  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const handleSubmit = () => {
    login(email, password)
  }

  return (
    <>
    <button>{login()}</button>
    </>
  )

}


export default Login;
