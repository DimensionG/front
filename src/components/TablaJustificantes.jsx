"use client"

const TablaJustificantes = ({ justificantes, setJustificantes }) => {
  const enviarACoordinador = (id) => {
    // Cambia el estado de "pendiente_enfermeria" a "pendiente_coordinacion"
    const nuevosJustificantes = justificantes.map(justificante => {
      if (justificante.id === id && justificante.estado === "pendiente_enfermeria") {
        return { ...justificante, estado: "pendiente_coordinacion" }
      }
      return justificante
    })
    setJustificantes(nuevosJustificantes)
  }

  return (
    <div>
      <h3>Justificantes recibidos</h3>
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
          {justificantes.map(j => (
            <tr key={j.id}>
              <td>{j.numero_control}</td>
              <td>{j.motivo}</td>
              <td>{j.fecha}</td>
              <td>
                {j.estado === "pendiente_enfermeria"
                  ? "Pendiente por enfermería"
                  : j.estado === "pendiente_coordinacion"
                  ? "Enviado a Coordinación"
                  : j.estado}
              </td>
              <td>
                {j.estado === "pendiente_enfermeria" ? (
                  <button onClick={() => enviarACoordinador(j.id)}>
                    Enviar a Coordinación
                  </button>
                ) : (
                  <span style={{ color: "green" }}>✔ Enviado</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TablaJustificantes
