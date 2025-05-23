"use client"

import { useEffect, useState } from "react"
import TablaEstudiantes from "./TablaEstudiantes"
import FormularioEstudiante from "./FormularioEstudiante"

const VistaEnfermeria = ({
  justificantes = [],
  setJustificantes = () => {},
  estudiantes = [],
  obtenerEstudiantes = () => {},
}) => {
  const [estudianteEditar, setEstudianteEditar] = useState(null)
  const [mensaje, setMensaje] = useState(null)

  useEffect(() => {
    obtenerEstudiantes()
  }, [])

  // Filtrar justificantes para mostrar solo los relevantes para enfermería
  const justificantesEnfermeria = justificantes.filter(
    (j) => j.estado === "pendiente_coordinacion" || j.estado === "aprobado" || j.estado === "rechazado",
  )

  return (
    <div>
      <div
        style={{
          backgroundColor: "#f0f9ff",
          padding: "1.5rem",
          borderRadius: "0.375rem",
          marginBottom: "2rem",
          border: "1px solid #bae6fd",
        }}
      >
        <h2 style={{ color: "#075985", marginBottom: "0.5rem" }}>Panel de Enfermería</h2>
        <p style={{ color: "#0369a1" }}>
          Bienvenido al panel de enfermería. Aquí puedes gestionar estudiantes y justificantes médicos.
        </p>
      </div>

      {/* Mensaje de éxito */}
      {mensaje && (
        <div
          style={{
            backgroundColor: mensaje.tipo === "success" ? "#dcfce7" : "#fee2e2",
            color: mensaje.tipo === "success" ? "#16a34a" : "#dc2626",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "16px",
            border: `1px solid ${mensaje.tipo === "success" ? "#86efac" : "#fca5a5"}`,
            textAlign: "center",
            fontWeight: "500",
          }}
        >
          {mensaje.texto}
        </div>
      )}

      {/* Mostrar justificantes enviados */}
      {justificantesEnfermeria.length > 0 && (
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ color: "#0369a1", marginBottom: "1rem" }}>
            Justificantes Enviados ({justificantesEnfermeria.length})
          </h3>
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
                </tr>
              </thead>
              <tbody>
                {justificantesEnfermeria.map((j) => (
                  <tr key={j.id}>
                    <td style={{ padding: "1rem 1.5rem", fontWeight: "500" }}>{j.numero_control}</td>
                    <td style={{ padding: "1rem 1.5rem" }}>{j.estudiante_nombre || "N/A"}</td>
                    <td style={{ padding: "1rem 1.5rem" }}>{j.motivo}</td>
                    <td style={{ padding: "1rem 1.5rem" }}>{j.fecha}</td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "9999px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          backgroundColor:
                            j.estado === "pendiente_coordinacion"
                              ? "#dbeafe"
                              : j.estado === "aprobado"
                                ? "#dcfce7"
                                : "#fee2e2",
                          color:
                            j.estado === "pendiente_coordinacion"
                              ? "#2563eb"
                              : j.estado === "aprobado"
                                ? "#16a34a"
                                : "#dc2626",
                        }}
                      >
                        {j.estado === "pendiente_coordinacion"
                          ? "En proceso de aprobación"
                          : j.estado === "aprobado"
                            ? "Aprobado"
                            : "Rechazado"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: "2rem" }}>
        <div>
          <FormularioEstudiante obtenerEstudiantes={obtenerEstudiantes} estudianteEditar={estudianteEditar} />
        </div>
      </div>

      <div>
        <TablaEstudiantes
          estudiantes={estudiantes}
          onEditar={setEstudianteEditar}
          obtenerEstudiantes={obtenerEstudiantes}
          justificantes={justificantes}
          setJustificantes={setJustificantes}
          setMensaje={setMensaje}
        />
      </div>
    </div>
  )
}

export default VistaEnfermeria
