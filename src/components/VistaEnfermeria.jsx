"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import TablaEstudiantes from "./TablaEstudiantes"
import FormularioEstudiante from "./FormularioEstudiante"
import TablaJustificantes from "./TablaJustificantes"

const VistaEnfermeria = () => {
  const [estudiantes, setEstudiantes] = useState([])
  const [estudianteEditar, setEstudianteEditar] = useState(null)
  const [justificantes, setJustificantes] = useState([
    {
      id: 1,
      numero_control: "21211212121",
      motivo: "Consulta médica",
      fecha: "2025-05-21",
      estado: "pendiente_enfermeria",
    },
    {
      id: 2,
      numero_control: "20214521",
      motivo: "Cirugía",
      fecha: "2025-05-20",
      estado: "pendiente_enfermeria",
    },
  ])

  const obtenerEstudiantes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/estudiantes")
      setEstudiantes(res.data)
    } catch (err) {
      console.error("Error al cargar estudiantes", err)
    }
  }

  useEffect(() => {
    obtenerEstudiantes()
  }, [])

  return (
    <div>
      <div
        style={{
          backgroundColor: "var(--color-primary-bg)",
          padding: "var(--spacing-lg)",
          borderRadius: "var(--border-radius-md)",
          marginBottom: "var(--spacing-xl)",
          border: "1px solid #bae6fd",
        }}
      >
        <h2 style={{ color: "var(--color-primary-dark)", marginBottom: "var(--spacing-sm)" }}>Panel de Enfermería</h2>
        <p style={{ color: "var(--color-primary)" }}>
          Bienvenido al panel de enfermería. Aquí puedes gestionar estudiantes y justificantes médicos.
        </p>
      </div>

      <div className="grid grid-cols-1">
        <div>
          <FormularioEstudiante obtenerEstudiantes={obtenerEstudiantes} estudianteEditar={estudianteEditar} />
        </div>

        <div>
          <TablaJustificantes justificantes={justificantes} setJustificantes={setJustificantes} />
        </div>
      </div>

      <div>
        <TablaEstudiantes
          estudiantes={estudiantes}
          onEditar={setEstudianteEditar}
          obtenerEstudiantes={obtenerEstudiantes}
        />
      </div>
    </div>
  )
}

export default VistaEnfermeria
