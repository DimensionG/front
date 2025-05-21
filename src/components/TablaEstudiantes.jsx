"use client"
import { useState } from "react"
import axios from "axios"

const TablaEstudiantes = ({ estudiantes, onEditar, obtenerEstudiantes }) => {
  const [paginaActual, setPaginaActual] = useState(1)
  const estudiantesPorPagina = 5

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

  // Paginación
  const totalPaginas = Math.ceil(estudiantes.length / estudiantesPorPagina)
  const indiceInicio = (paginaActual - 1) * estudiantesPorPagina
  const estudiantesPaginados = estudiantes.slice(indiceInicio, indiceInicio + estudiantesPorPagina)

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina)
    }
  }

  return (
    <div>
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
          {estudiantesPaginados.map((estudiante) => (
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

      {/* Controles de paginación */}
      <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
          Anterior
        </button>
        <span>Página {paginaActual} de {totalPaginas}</span>
        <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default TablaEstudiantes
