"use client"
import axios from "axios"
import { useState } from "react"

const TablaEstudiantes = ({ estudiantes, onEditar, obtenerEstudiantes }) => {
  const [busqueda, setBusqueda] = useState("")

  const eliminarEstudiante = async (numero_control) => {
    if (window.confirm("¿Estás seguro de eliminar este estudiante?")) {
      try {
        await axios.delete(`http://localhost:5000/api/estudiantes/${numero_control}`)
        alert("Estudiante eliminado correctamente")
        obtenerEstudiantes()
      } catch (error) {
        alert("Error al eliminar el estudiante")
        console.error(error)
      }
    }
  }

  const estudiantesFiltrados = estudiantes.filter((est) => {
    const termino = busqueda.toLowerCase()
    return (
      est.numero_control.toLowerCase().includes(termino) ||
      est.nombre_completo.toLowerCase().includes(termino)
    )
  })

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por número de control o nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          marginBottom: "1rem",
          padding: "8px",
          width: "100%",
          fontSize: "16px",
        }}
      />

      <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>No. Control</th>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Semestre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantesFiltrados.map((estudiante) => (
            <tr key={estudiante.id}>
              <td>{estudiante.numero_control}</td>
              <td>{estudiante.nombre_completo}</td>
              <td>{estudiante.carrera}</td>
              <td>{estudiante.semestre}</td>
              <td>{estudiante.correo}</td>
              <td>
                <button onClick={() => onEditar(estudiante)}>Editar</button>
                <button onClick={() => eliminarEstudiante(estudiante.numero_control)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaEstudiantes
