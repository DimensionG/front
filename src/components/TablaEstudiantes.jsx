"use client"

import { useState } from "react"
import axios from "axios"

const TablaEstudiantes = ({ estudiantes, onEditar, obtenerEstudiantes, rol }) => {
  const [paginaActual, setPaginaActual] = useState(1)
  const [busqueda, setBusqueda] = useState("")
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

  // Filtrado
  const estudiantesFiltrados = estudiantes.filter((est) => {
    const termino = busqueda.toLowerCase()
    return (
      est.numero_control?.toLowerCase().includes(termino) ||
      est.nombre_completo?.toLowerCase().includes(termino) ||
      est.carrera?.toLowerCase().includes(termino)
    )
  })

  // Paginación
  const totalPaginas = Math.ceil(estudiantesFiltrados.length / estudiantesPorPagina)
  const indiceInicio = (paginaActual - 1) * estudiantesPorPagina
  const estudiantesPaginados = estudiantesFiltrados.slice(indiceInicio, indiceInicio + estudiantesPorPagina)

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina)
    }
  }

  return (
    <div className="mb-xl">
      <div className="flex justify-between items-center mb-lg">
        <h2 className="text-primary">Lista de Estudiantes</h2>
        <div style={{ width: "250px" }}>
          <input
            type="text"
            placeholder="Buscar estudiante..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="table">
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
            {estudiantesPaginados.length > 0 ? (
              estudiantesPaginados.map((estudiante) => (
                <tr key={estudiante.id}>
                  <td style={{ fontWeight: "500" }}>{estudiante.numero_control}</td>
                  <td>{estudiante.nombre_completo}</td>
                  <td>{estudiante.carrera}</td>
                  <td style={{ textAlign: "center" }}>{estudiante.semestre}</td>
                  <td>{estudiante.correo}</td>
                  <td>
                    <div className="flex gap-sm">
                      <button onClick={() => onEditar(estudiante)} className="btn btn-sm btn-secondary">
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarEstudiante(estudiante.numero_control)}
                        className="btn btn-sm btn-danger"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "var(--spacing-lg)" }}>
                  No se encontraron estudiantes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Controles de paginación */}
      {totalPaginas > 1 && (
        <div className="pagination">
          <button
            onClick={() => cambiarPagina(paginaActual - 1)}
            disabled={paginaActual === 1}
            className="pagination-btn"
          >
            Anterior
          </button>
          <span style={{ padding: "var(--spacing-sm) var(--spacing-md)" }}>
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            onClick={() => cambiarPagina(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className="pagination-btn"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}

export default TablaEstudiantes
