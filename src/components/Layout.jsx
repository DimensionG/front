"use client"

import { useState } from "react"
import { useRol } from "../context/RolContext"
import { useNavigate } from "react-router-dom"
import { usuarios } from "../data/usuarios"

const Login = () => {
  const { setRol } = useRol()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!username || !password) {
      setError("Por favor ingresa usuario y contraseña")
      return
    }

    const user = usuarios.find((u) => u.username === username && u.password === password)

    if (user) {
      setRol(user.rol)

      // Redirigir según el rol
      if (user.rol === "enfermeria") {
        navigate("/enfermeria")
      } else if (user.rol === "coordinacion") {
        navigate("/coordinacion")
      } else {
        navigate("/justificantes")
      }
    } else {
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-gray-100)",
        padding: "0 var(--spacing-md)",
      }}
    >
      <div className="card" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-xl">
          <h1 className="text-primary">Sistema de Justificantes</h1>
          <p className="text-gray">Inicia sesión para continuar</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Usuario
          </label>
          <input
            id="username"
            type="text"
            className="form-input"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin} className="btn btn-primary btn-block">
          Ingresar
        </button>

        <div className="mt-lg text-center text-sm text-gray">
          <p>Credenciales de prueba:</p>
          <p>Usuario: admin | Contraseña: admin</p>
        </div>
      </div>
    </div>
  )
}

export default Login
