"use client"

const TablaJustificantes = ({ justificantes, setJustificantes, onEnviarACoordinacion = null }) => {
  // Función para enviar a coordinación
  const enviarACoordinador = (id) => {
    console.log("Llamando a enviarACoordinador con id:", id)

    if (onEnviarACoordinacion) {
      // Si se proporciona una función personalizada, la usamos
      onEnviarACoordinacion(id)
    } else {
      // Función predeterminada
      const nuevosJustificantes = justificantes.map((justificante) => {
        if (justificante.id === id && justificante.estado === "pendiente_enfermeria") {
          return { ...justificante, estado: "pendiente_coordinacion" }
        }
        return justificante
      })
      setJustificantes(nuevosJustificantes)
    }
  }

  const getEstadoLabel = (estado) => {
    const estilos = {
      pendiente_enfermeria: {
        backgroundColor: "#fef9c3",
        color: "#ca8a04",
        text: "Pendiente por enfermería",
      },
      pendiente_coordinacion: {
        backgroundColor: "#dbeafe",
        color: "#2563eb",
        text: "Enviado a Coordinación",
      },
      aprobado: {
        backgroundColor: "#dcfce7",
        color: "#16a34a",
        text: "Aprobado",
      },
      rechazado: {
        backgroundColor: "#fee2e2",
        color: "#dc2626",
        text: "Rechazado",
      },
    }

    const estilo = estilos[estado] || { backgroundColor: "#f3f4f6", color: "#6b7280", text: estado }

    return (
      <span
        style={{
          display: "inline-block",
          padding: "0.25rem 0.75rem",
          borderRadius: "9999px",
          fontSize: "0.75rem",
          fontWeight: "500",
          backgroundColor: estilo.backgroundColor,
          color: estilo.color,
        }}
      >
        {estilo.text}
      </span>
    )
  }

  return (
    <div>
      <h3 style={{ color: "#0369a1", marginBottom: "1.5rem", fontSize: "1.25rem" }}>Justificantes recibidos</h3>

      <div
        style={{
          overflowX: "auto",
          borderRadius: "0.375rem",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          marginBottom: "2rem",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  fontWeight: "600",
                  textAlign: "left",
                  padding: "1rem 1.5rem",
                  borderBottom: "1px solid #d1d5db",
                }}
              >
                No. Control
              </th>
              <th
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  fontWeight: "600",
                  textAlign: "left",
                  padding: "1rem 1.5rem",
                  borderBottom: "1px solid #d1d5db",
                }}
              >
                Estudiante
              </th>
              <th
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  fontWeight: "600",
                  textAlign: "left",
                  padding: "1rem 1.5rem",
                  borderBottom: "1px solid #d1d5db",
                }}
              >
                Motivo
              </th>
              <th
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  fontWeight: "600",
                  textAlign: "left",
                  padding: "1rem 1.5rem",
                  borderBottom: "1px solid #d1d5db",
                }}
              >
                Fecha
              </th>
              <th
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  fontWeight: "600",
                  textAlign: "left",
                  padding: "1rem 1.5rem",
                  borderBottom: "1px solid #d1d5db",
                }}
              >
                Estado
              </th>
              <th
                style={{
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  fontWeight: "600",
                  textAlign: "left",
                  padding: "1rem 1.5rem",
                  borderBottom: "1px solid #d1d5db",
                }}
              >
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {justificantes.length > 0 ? (
              justificantes.map((j) => (
                <tr
                  key={j.id}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#f9fafb"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "white"
                  }}
                >
                  <td
                    style={{
                      padding: "1rem 1.5rem",
                      color: "#374151",
                      fontWeight: "500",
                    }}
                  >
                    {j.numero_control}
                  </td>
                  <td
                    style={{
                      padding: "1rem 1.5rem",
                      color: "#374151",
                    }}
                  >
                    {j.estudiante_nombre || "N/A"}
                  </td>
                  <td
                    style={{
                      padding: "1rem 1.5rem",
                      color: "#374151",
                    }}
                  >
                    {j.motivo}
                  </td>
                  <td
                    style={{
                      padding: "1rem 1.5rem",
                      color: "#374151",
                    }}
                  >
                    {j.fecha}
                  </td>
                  <td
                    style={{
                      padding: "1rem 1.5rem",
                    }}
                  >
                    {getEstadoLabel(j.estado)}
                  </td>
                  <td
                    style={{
                      padding: "1rem 1.5rem",
                    }}
                  >
                    {j.estado === "pendiente_enfermeria" ? (
                      <button
                        onClick={() => enviarACoordinador(j.id)}
                        style={{
                          padding: "0.5rem 1rem",
                          backgroundColor: "#0369a1",
                          color: "white",
                          border: "none",
                          borderRadius: "0.375rem",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#075985"
                          e.target.style.transform = "translateY(-1px)"
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#0369a1"
                          e.target.style.transform = "translateY(0)"
                        }}
                      >
                        Enviar a Coordinación
                      </button>
                    ) : (
                      <span
                        style={{
                          color: "#16a34a",
                          display: "flex",
                          alignItems: "center",
                          fontWeight: "500",
                        }}
                      >
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
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "2rem",
                    color: "#6b7280",
                  }}
                >
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
