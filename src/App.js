"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import usuarios from "./data/usuarios"
import FormularioEstudiante from "./components/FormularioEstudiante"
import TablaEstudiantes from "./components/TablaEstudiantes"
import VistaEnfermeria from "./components/VistaEnfermeria"
import VistaCoordinador from "./components/VistaCoordinacion"
import "./login-styles.css" // Importamos los estilos del login

const App = () => {
  const [estudiantes, setEstudiantes] = useState([])
  const [estudianteEditar, setEstudianteEditar] = useState(null)
  const [usuario, setUsuario] = useState("")
  const [password, setPassword] = useState("")
  const [rol, setRol] = useState(null)
  const [errorLogin, setErrorLogin] = useState("")

  const [justificantes, setJustificantes] = useState([])

  // Obtener estudiantes
  const obtenerEstudiantes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/estudiantes")
      setEstudiantes(response.data)
    } catch (error) {
      console.error("Error al obtener estudiantes:", error)
    }
  }

  // Obtener justificantes
  const obtenerJustificantes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/justificantes")
      setJustificantes(response.data)
    } catch (error) {
      console.error("Error al obtener justificantes:", error)
    }
  }

  useEffect(() => {
    if (rol === "coordinacion") {
      obtenerEstudiantes()
      obtenerJustificantes()
    }
  }, [rol])

  const handleLogin = (e) => {
    e.preventDefault()
    const usuarioEncontrado = usuarios.find((u) => u.usuario === usuario && u.password === password)
    if (usuarioEncontrado) {
      setRol(usuarioEncontrado.rol)
      setErrorLogin("")
    } else {
      setErrorLogin("Credenciales incorrectas")
    }
  }

  const handleLogout = () => {
    setRol(null)
    setUsuario("")
    setPassword("")
    setEstudiantes([])
    setEstudianteEditar(null)
    setJustificantes([])
  }

  // LOGIN
  if (!rol) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">Sistema de Justificantes</h2>
            <p className="login-subtitle">Inicia sesión para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              className="login-input"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
            <button type="submit" className="login-button">
              Iniciar Sesión
            </button>
          </form>

          {errorLogin && <div className="login-error">{errorLogin}</div>}

          <div className="login-footer">
            <p>Credenciales de prueba:</p>
            <p>Usuario: admin | Contraseña: admin</p>
          </div>
        </div>
      </div>
    )
  }

  // ENFERMERÍA
  if (rol === "enfermeria") {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Panel de Enfermería</h1>
        <p>
          Rol actual: <strong>{rol}</strong>
        </p>
        <button onClick={handleLogout} style={{ marginBottom: "1rem" }}>
          Cerrar sesión
        </button>
        <VistaEnfermeria />
      </div>
    )
  }

  // COORDINACIÓN
  if (rol === "coordinacion") {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Gestor de Estudiantes y Justificantes</h1>
        <p>
          Rol actual: <strong>{rol}</strong>
        </p>
        <button onClick={handleLogout} style={{ marginBottom: "1rem" }}>
          Cerrar sesión
        </button>

        <FormularioEstudiante obtenerEstudiantes={obtenerEstudiantes} estudianteEditar={estudianteEditar} />

        <TablaEstudiantes
          estudiantes={estudiantes}
          onEditar={setEstudianteEditar}
          obtenerEstudiantes={obtenerEstudiantes}
          rol={rol}
        />

        <hr />

        <VistaCoordinador justificantes={justificantes} setJustificantes={setJustificantes} />
      </div>
    )
  }

  // ROL NO RECONOCIDO
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Rol no reconocido</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  )
}

export default App
