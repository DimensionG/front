"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useRol } from "../context/RolContext"
import TablaEstudiantes from "./TablaEstudiantes"
import { useNavigate } from "react-router-dom"

const VistaJustificantes = () => {
  const { rol } = useRol()
  const navigate = useNavigate()
  const [estudiantes, setEstudiantes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!rol) navigate("/") // Redirige si no hay sesión
    obtenerEstudiantes()
  }, [rol, navigate])

  const obtenerEstudiantes = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:5000/api/estudiantes")
      setEstudiantes(response.data)
    } catch (error) {
      console.error("Error al obtener estudiantes", error)
    } finally {
      setLoading(false)
    }
  }

  const onEditar = (estudiante) => {
    alert(`Función editar: ${estudiante.nombre_completo}`)
    // Aquí podrías abrir un formulario modal, por ejemplo
  }

  return (
    <div>
      <div
        style={{
          background: "linear-gradient(to right, var(--color-primary-bg), var(--color-secondary-bg))",
          padding: "var(--spacing-lg)",
          borderRadius: "var(--border-radius-md)",
          marginBottom: "var(--spacing-xl)",
          border: "1px solid var(--color-primary-light)",
        }}
      >
        <h2 style={{ color: "var(--color-primary-dark)", marginBottom: "var(--spacing-sm)" }}>
          Vista General de Justificantes
        </h2>
        <p style={{ color: "var(--color-gray-700)" }}>
          Bienvenido al sistema de gestión de justificantes. Tu rol actual es:{" "}
          <span style={{ fontWeight: "600" }}>{rol}</span>
        </p>
      </div>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
          }}
        >
          <div className="spinner"></div>
        </div>
      ) : (
        <TablaEstudiantes
          estudiantes={estudiantes}
          onEditar={onEditar}
          obtenerEstudiantes={obtenerEstudiantes}
          rol={rol}
        />
      )}
    </div>
  )
}

export default VistaJustificantes
