"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import usuarios from "./data/usuarios"
import FormularioEstudiante from "./components/FormularioEstudiante"
import TablaEstudiantes from "./components/TablaEstudiantes"
import VistaEnfermeria from "./components/VistaEnfermeria"
import VistaCoordinador from "./components/VistaCoordinacion" // ✅ Agregado

const App = () => {
  const [estudiantes, setEstudiantes] = useState([])
  const [estudianteEditar, setEstudianteEditar] = useState(null)
  const [usuario, setUsuario] = useState("")
  const [password, setPassword] = useState("")
  const [rol, setRol] = useState(null)
  const [errorLogin, setErrorLogin] = useState("")

  const [justificantes, setJustificantes] = useState([]) // ✅ Nuevo estado para justificantes

  // 🔄 Obtener estudiantes
  const obtenerEstudiantes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/estudiantes")
      setEstudiantes(response.data)
    } catch (error) {
      console.error("Error al obtener estudiantes:", error)
    }
  }

  // 🔄 Obtener justificantes
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
    const usuarioEncontrado = usuarios.find(
      (u) => u.usuario === usuario && u.password === password
    )
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
    setJustificantes([]) // ✅ Limpiar justificantes también
  }

  // LOGIN
  if (!rol) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
        {errorLogin && <p style={{ color: "red" }}>{errorLogin}</p>}
      </div>
    )
  }

  // ENFERMERÍA
  if (rol === "enfermeria") {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Panel de Enfermería</h1>
        <p>Rol actual: <strong>{rol}</strong></p>
        <button onClick={handleLogout} style={{ marginBottom: "1rem" }}>Cerrar sesión</button>
        <VistaEnfermeria />
      </div>
    )
  }

  // COORDINACIÓN
  if (rol === "coordinacion") {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Gestor de Estudiantes y Justificantes</h1>
        <p>Rol actual: <strong>{rol}</strong></p>
        <button onClick={handleLogout} style={{ marginBottom: "1rem" }}>Cerrar sesión</button>

        <FormularioEstudiante
          obtenerEstudiantes={obtenerEstudiantes}
          estudianteEditar={estudianteEditar}
        />

        <TablaEstudiantes
          estudiantes={estudiantes}
          onEditar={setEstudianteEditar}
          obtenerEstudiantes={obtenerEstudiantes}
          rol={rol}
        />

        <hr />

        <VistaCoordinador
          justificantes={justificantes}
          setJustificantes={setJustificantes}
        />
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
