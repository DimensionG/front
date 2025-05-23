"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import usuarios from "./data/usuarios"
import FormularioEstudiante from "./components/FormularioEstudiante"
import TablaEstudiantes from "./components/TablaEstudiantes"
import VistaEnfermeria from "./components/VistaEnfermeria"
import VistaCoordinador from "./components/VistaCoordinacion"
import "./login-styles.css"

const App = () => {
  const [estudiantes, setEstudiantes] = useState([])
  const [estudianteEditar, setEstudianteEditar] = useState(null)
  const [usuario, setUsuario] = useState("")
  const [password, setPassword] = useState("")
  const [rol, setRol] = useState(null)
  const [errorLogin, setErrorLogin] = useState("")

  // Estado compartido para justificantes - se carga desde localStorage
  const [justificantes, setJustificantes] = useState(() => {
    try {
      const savedJustificantes = localStorage.getItem("justificantes")
      return savedJustificantes ? JSON.parse(savedJustificantes) : []
    } catch (error) {
      console.error("Error al cargar justificantes desde localStorage:", error)
      return []
    }
  })

  // Guardar justificantes en localStorage cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem("justificantes", JSON.stringify(justificantes))
      console.log("Justificantes guardados en localStorage:", justificantes)
    } catch (error) {
      console.error("Error al guardar justificantes en localStorage:", error)
    }
  }, [justificantes])

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
      // Si falla la API, mantenemos los datos del localStorage
    }
  }

  useEffect(() => {
    if (rol) {
      obtenerEstudiantes()
      // Solo intentamos obtener justificantes si tenemos una API
      // obtenerJustificantes()
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
    // NO borramos los justificantes al cerrar sesión para mantener la persistencia
  }

  // Función para actualizar justificantes (compartida entre componentes)
  const actualizarJustificantes = (nuevosJustificantes) => {
    console.log("Actualizando justificantes:", nuevosJustificantes)
    setJustificantes(nuevosJustificantes)
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
        <VistaEnfermeria
          justificantes={justificantes}
          setJustificantes={actualizarJustificantes}
          estudiantes={estudiantes}
          obtenerEstudiantes={obtenerEstudiantes}
        />
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
          justificantes={justificantes}
          setJustificantes={actualizarJustificantes}
        />

        <hr />

        <VistaCoordinador justificantes={justificantes} setJustificantes={actualizarJustificantes} />
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
