"use client"

const TablaJustificantes = ({ justificantes, setJustificantes }) => {
  const enviarACoordinador = (id) => {
    // Cambia el estado de "pendiente_enfermeria" a "pendiente_coordinacion"
    const nuevosJustificantes = justificantes.map((justificante) => {
      if (justificante.id === id && justificante.estado === "pendiente_enfermeria") {
        return { ...justificante, estado: "pendiente_coordinacion" }
      }
      return justificante
    })
    setJustificantes(nuevosJustificantes)
  }

  const getEstadoLabel = (estado) => {
    switch (estado) {
      case "pendiente_enfermeria":
        return <span className="badge badge-warning">Pendiente por enfermería</span>
      case "pendiente_coordinacion":
        return <span className="badge badge-info">Enviado a Coordinación</span>
      case "aprobado":
        return <span className="badge badge-success">Aprobado</span>
      case "rechazado":
        return <span className="badge badge-error">Rechazado</span>
      default:
        return <span className="badge">{estado}</span>
    }
  }

  return (
    <div>
      <h3 className="text-primary mb-lg">Justificantes recibidos</h3>

      <div className="table-container">
        <table className="table">
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
            {justificantes.length > 0 ? (
              justificantes.map((j) => (
                <tr key={j.id}>
                  <td style={{ fontWeight: "500" }}>{j.numero_control}</td>
                  <td>{j.motivo}</td>
                  <td>{j.fecha}</td>
                  <td>{getEstadoLabel(j.estado)}</td>
                  <td>
                    {j.estado === "pendiente_enfermeria" ? (
                      <button onClick={() => enviarACoordinador(j.id)} className="btn btn-sm btn-primary">
                        Enviar a Coordinación
                      </button>
                    ) : (
                      <span style={{ color: "var(--color-success)", display: "flex", alignItems: "center" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ marginRight: "4px" }}
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        Enviado
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "var(--spacing-lg)" }}>
                  No hay justificantes disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaJustificantes
