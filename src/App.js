"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import FormularioEstudiante from "./components/FormularioEstudiante"
import TablaEstudiantes from "./components/TablaEstudiantes"
import usuarios from "./data/usuarios"

const App = () => {
  const [estudiantes, setEstudiantes] = useState([])
  const [estudianteEditar, setEstudianteEditar] = useState(null)
  const [usuario, setUsuario] = useState("")
  const [password, setPassword] = useState("")
  const [rol, setRol] = useState(null)
  const [errorLogin, setErrorLogin] = useState("")

  const obtenerEstudiantes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/estudiantes")
      setEstudiantes(response.data)
    } catch (error) {
      console.error("Error al obtener estudiantes:", error)
    }
  }

  useEffect(() => {
    if (rol) {
      obtenerEstudiantes()
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
  }

  // Si aún no hay rol, mostramos login
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

  // Si ya hay rol, mostramos la app según el rol
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestor de Estudiantes</h1>
      <p>Rol actual: <strong>{rol}</strong></p>
      <button onClick={handleLogout} style={{ marginBottom: "1rem" }}>Cerrar sesión</button>

      {/* Solo se muestra el formulario a ciertos roles si quieres */}
      {rol === "coordinacion" && (
        <FormularioEstudiante
          obtenerEstudiantes={obtenerEstudiantes}
          estudianteEditar={estudianteEditar}
        />
      )}

      <TablaEstudiantes
        estudiantes={estudiantes}
        onEditar={rol === "coordinacion" ? setEstudianteEditar : () => {}}
        obtenerEstudiantes={obtenerEstudiantes}
        rol={rol}
      />
    </div>
  )
}

export default App
