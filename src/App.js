"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import FormularioEstudiante from "./components/FormularioEstudiante"
import TablaEstudiantes from "./components/TablaEstudiantes"

const App = () => {
  const [estudiantes, setEstudiantes] = useState([])
  const [estudianteEditar, setEstudianteEditar] = useState(null)

  const obtenerEstudiantes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/estudiantes")
      setEstudiantes(response.data)
    } catch (error) {
      console.error("Error al obtener estudiantes:", error)
    }
  }

  useEffect(() => {
    obtenerEstudiantes()
  }, [])

  return (
    <div>
      <h1>Gestor de Estudiantes</h1>
      <FormularioEstudiante obtenerEstudiantes={obtenerEstudiantes} estudianteEditar={estudianteEditar} />
      {/* Aquí añadimos obtenerEstudiantes como prop */}
      <TablaEstudiantes
        estudiantes={estudiantes}
        onEditar={setEstudianteEditar}
        obtenerEstudiantes={obtenerEstudiantes}
      />
    </div>
  )
}

export default App
