"use client"

const VistaCoordinacion = ({ justificantes = [], setJustificantes = () => {} }) => {
  const aprobarJustificante = (id) => {
    const nuevos = justificantes.map((j) => {
      if (j.id === id && j.estado === "pendiente_coordinacion") {
        return { ...j, estado: "aprobado" }
      }
      return j
    })
    setJustificantes(nuevos)
  }

  const rechazarJustificante = (id) => {
    const nuevos = justificantes.map((j) => {
      if (j.id === id && j.estado === "pendiente_coordinacion") {
        return { ...j, estado: "rechazado" }
      }
      return j
    })
    setJustificantes(nuevos)
  }

  const justificantesPendientes = justificantes.filter((j) => j.estado === "pendiente_coordinacion")

  return (
    <div>
      <div
        style={{
          backgroundColor: "var(--color-secondary-bg)",
          padding: "var(--spacing-lg)",
          borderRadius: "var(--border-radius-md)",
          marginBottom: "var(--spacing-xl)",
          border: "1px solid #c4b5fd",
        }}
      >
        <h2 style={{ color: "var(--color-secondary-dark)", marginBottom: "var(--spacing-sm)" }}>
          Panel de Coordinación
        </h2>
        <p style={{ color: "var(--color-secondary)" }}>
          Bienvenido al panel de coordinación. Aquí puedes revisar y aprobar justificantes enviados por enfermería.
        </p>
      </div>

      <div>
        <h2 style={{ color: "var(--color-secondary)" }} className="mb-lg">
          Justificantes en espera de aprobación
        </h2>

        {justificantesPendientes.length === 0 ? (
          <div
            style={{
              backgroundColor: "var(--color-gray-50)",
              padding: "var(--spacing-xl)",
              textAlign: "center",
              borderRadius: "var(--border-radius-md)",
              border: "1px solid var(--color-gray-200)",
            }}
          >
            <p style={{ color: "var(--color-gray-500)" }}>No hay justificantes pendientes de aprobación.</p>
          </div>
        ) : (
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
                {justificantesPendientes.map((j) => (
                  <tr key={j.id}>
                    <td style={{ fontWeight: "500" }}>{j.numero_control}</td>
                    <td>{j.motivo}</td>
                    <td>{j.fecha}</td>
                    <td>
                      <span className="badge badge-info">Pendiente de aprobación</span>
                    </td>
                    <td>
                      <div className="flex gap-sm">
                        <button onClick={() => aprobarJustificante(j.id)} className="btn btn-sm btn-success">
                          Aprobar
                        </button>
                        <button onClick={() => rechazarJustificante(j.id)} className="btn btn-sm btn-danger">
                          Rechazar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default VistaCoordinacion
