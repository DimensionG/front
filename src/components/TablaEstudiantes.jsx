"use client"

import { useState } from "react"
import axios from "axios"

const TablaEstudiantes = ({
  estudiantes,
  onEditar,
  obtenerEstudiantes,
  rol,
  justificantes = [],
  setJustificantes = () => {},
  setMensaje = () => {},
}) => {
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

  // Función para enviar justificante a coordinación
  const enviarACoordinacion = (estudiante) => {
    // Primero preguntamos por el motivo
    const motivo = prompt("Ingrese el motivo del justificante:")

    if (!motivo || !motivo.trim()) return

    // Creamos un nuevo justificante
    const nuevoJustificante = {
      id: Date.now(), // ID temporal basado en timestamp
      numero_control: estudiante.numero_control,
      motivo: motivo.trim(),
      fecha: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
      estado: "pendiente_coordinacion", // Lo enviamos directamente a coordinación
      estudiante_nombre: estudiante.nombre_completo,
    }

    console.log("Creando nuevo justificante:", nuevoJustificante)

    // Agregamos el nuevo justificante al estado
    const nuevosJustificantes = [...justificantes, nuevoJustificante]
    setJustificantes(nuevosJustificantes)

    // Mostramos mensaje de éxito si estamos en enfermería
    if (setMensaje) {
      setMensaje({
        tipo: "success",
        texto: `✅ Justificante enviado a coordinación para ${estudiante.nombre_completo}`,
      })

      // Ocultar mensaje después de 3 segundos
      setTimeout(() => {
        setMensaje(null)
      }, 3000)
    } else {
      // Si no tenemos setMensaje, usamos alert
      alert(`Justificante enviado a coordinación para ${estudiante.nombre_completo}`)
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
                        onClick={() => enviarACoordinacion(estudiante)}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: "#0369a1",
                          color: "white",
                        }}
                      >
                        Enviar a Coordinación
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
