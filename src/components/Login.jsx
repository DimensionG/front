import { useState } from "react"
import { useRol } from "../context/RolContext"
import { useNavigate } from "react-router-dom"
import { usuarios } from "../data/usuarios"

const Login = () => {
  const { setRol } = useRol()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    const user = usuarios.find(
      (u) => u.username === username && u.password === password
    )

    if (user) {
      setRol(user.rol)
      navigate("/justificantes")
    } else {
      alert("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Inicio de Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Ingresar</button>
    </div>
  )
}

export default Login
