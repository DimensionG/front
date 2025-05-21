import TablaEstudiantes from "./TablaEstudiantes"
import FormularioEstudiante from "./FormularioEstudiante"
import TablaJustificantes from "./TablaJustificantes"
import { useEffect, useState } from "react"
import axios from "axios"

const VistaEnfermeria = () => {
  const [estudiantes, setEstudiantes] = useState([])
  const [estudianteEditar, setEstudianteEditar] = useState(null)
  // 🟩 Aquí adentro está bien definido
  const [justificantes, setJustificantes] = useState([
    {
      id: 1,
      numero_control: "21211212121",
      motivo: "Consulta médica",
      fecha: "2025-05-21",
      estado: "pendiente_enfermeria"
    },
    {
      id: 2,
      numero_control: "20214521",
      motivo: "Cirugía",
      fecha: "2025-05-20",
      estado: "pendiente_enfermeria"
    }
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
    <h2>Panel de Enfermería</h2>
    <FormularioEstudiante obtenerEstudiantes={obtenerEstudiantes} estudianteEditar={estudianteEditar} />
    <TablaEstudiantes estudiantes={estudiantes} onEditar={setEstudianteEditar} obtenerEstudiantes={obtenerEstudiantes} />
    <TablaJustificantes justificantes={justificantes} setJustificantes={setJustificantes} />


    {/* Tabla de justificantes - estática por ahora */}
    <div style={{ marginTop: "2rem" }}>
      <h2>Lista de Justificantes</h2>
      <table border={1} cellPadding={8} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>No. Control</th>
            <th>Motivo</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>21211212121</td>
            <td>Consulta médica</td>
            <td>2025-05-21</td>
            <td>Pendiente</td>
            <td><button>Validar</button></td>
          </tr>
          <tr>
            <td>2</td>
            <td>20214521</td>
            <td>Cirugía</td>
            <td>2025-05-20</td>
            <td>Aprobado</td>
            <td><button>Revisar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

}

export default VistaEnfermeria
