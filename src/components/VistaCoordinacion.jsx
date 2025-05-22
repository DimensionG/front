"use client"
import React from "react"

const VistaCoordinador = ({ justificantes, setJustificantes }) => {
  const aprobarJustificante = (id) => {
    const nuevos = justificantes.map(j => {
      if (j.id === id && j.estado === "pendiente_coordinacion") {
        return { ...j, estado: "aprobado" }
      }
      return j
    })
    setJustificantes(nuevos)
  }

  const rechazarJustificante = (id) => {
    const nuevos = justificantes.map(j => {
      if (j.id === id && j.estado === "pendiente_coordinacion") {
        return { ...j, estado: "rechazado" }
      }
      return j
    })
    setJustificantes(nuevos)
  }

  const justificantesPendientes = justificantes.filter(j => j.estado === "pendiente_coordinacion")

  return (
    <div>
      <h2>Justificantes en espera de Coordinación</h2>
      {justificantesPendientes.length === 0 ? (
        <p>No hay justificantes pendientes.</p>
      ) : (
        <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>No. Control</th>
              <th>Motivo</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {justificantesPendientes.map(j => (
              <tr key={j.id}>
                <td>{j.numero_control}</td>
                <td>{j.motivo}</td>
                <td>{j.fecha}</td>
                <td>{j.estado}</td>
                <td>
                  <button onClick={() => aprobarJustificante(j.id)}>Aprobar</button>{" "}
                  <button onClick={() => rechazarJustificante(j.id)}>Rechazar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default VistaCoordinador
