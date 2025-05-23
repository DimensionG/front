"use client"
import { useEffect } from "react"

const VistaCoordinacion = ({ justificantes = [], setJustificantes = () => {} }) => {
  // Añadimos logs para depuración
  useEffect(() => {
    console.log("Justificantes en VistaCoordinacion:", justificantes)
  }, [justificantes])

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

  // Filtramos solo los justificantes pendientes de coordinación
  const justificantesPendientes = justificantes.filter((j) => j.estado === "pendiente_coordinacion")

  console.log("Justificantes pendientes:", justificantesPendientes)

  return (
    <div>
      <div
        style={{
          backgroundColor: "#f5f3ff",
          padding: "1.5rem",
          borderRadius: "0.375rem",
          marginBottom: "2rem",
          border: "1px solid #c4b5fd",
        }}
      >
        <h2 style={{ color: "#5b21b6", marginBottom: "0.5rem" }}>Panel de Coordinación</h2>
        <p style={{ color: "#6d28d9" }}>
          Bienvenido al panel de coordinación. Aquí puedes revisar y aprobar justificantes enviados por enfermería.
        </p>
      </div>

      <div>
        <h2 style={{ color: "#6d28d9", marginBottom: "1.5rem", fontSize: "1.5rem" }}>
          Justificantes en espera de aprobación ({justificantesPendientes.length})
        </h2>

        {justificantesPendientes.length === 0 ? (
          <div
            style={{
              backgroundColor: "#f9fafb",
              padding: "2rem",
              textAlign: "center",
              borderRadius: "0.375rem",
              border: "1px solid #e5e7eb",
            }}
          >
            <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>📋 No hay justificantes pendientes de aprobación.</p>
            <p style={{ color: "#9ca3af", fontSize: "0.9rem", marginTop: "0.5rem" }}>
              Los justificantes enviados desde enfermería aparecerán aquí.
            </p>
          </div>
        ) : (
          <div
            style={{
              overflowX: "auto",
              borderRadius: "0.375rem",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
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
                {justificantesPendientes.map((j) => (
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
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          backgroundColor: "#dbeafe",
                          color: "#2563eb",
                        }}
                      >
                        Pendiente de aprobación
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "1rem 1.5rem",
                      }}
                    >
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => aprobarJustificante(j.id)}
                          style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#16a34a",
                            color: "white",
                            border: "none",
                            borderRadius: "0.375rem",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#15803d"
                            e.target.style.transform = "translateY(-1px)"
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#16a34a"
                            e.target.style.transform = "translateY(0)"
                          }}
                        >
                          Aprobar
                        </button>
                        <button
                          onClick={() => rechazarJustificante(j.id)}
                          style={{
                            padding: "0.5rem 1rem",
                            backgroundColor: "#dc2626",
                            color: "white",
                            border: "none",
                            borderRadius: "0.375rem",
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#b91c1c"
                            e.target.style.transform = "translateY(-1px)"
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#dc2626"
                            e.target.style.transform = "translateY(0)"
                          }}
                        >
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
