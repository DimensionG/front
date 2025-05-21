import TablaEstudiantes from "./TablaEstudiantes"
import FormularioEstudiante from "./FormularioEstudiante"
import { useEffect, useState } from "react"
import axios from "axios"

const VistaEnfermeria = () => {
  const [estudiantes, setEstudiantes] = useState([])
  const [estudianteEditar, setEstudianteEditar] = useState(null)

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
    </div>
  )
}

export default VistaEnfermeria
