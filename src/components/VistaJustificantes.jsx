import { useEffect, useState } from "react"
import axios from "axios"
import { useRol } from "../context/RolContext"
import TablaEstudiantes from "./TablaEstudiantes"
import { useNavigate } from "react-router-dom"

const VistaJustificantes = () => {
  const { rol } = useRol()
  const navigate = useNavigate()
  const [estudiantes, setEstudiantes] = useState([])

  useEffect(() => {
    if (!rol) navigate("/") // Redirige si no hay sesión
    obtenerEstudiantes()
  }, [rol])

  const obtenerEstudiantes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/estudiantes")
      setEstudiantes(response.data)
    } catch (error) {
      console.error("Error al obtener estudiantes", error)
    }
  }

  const onEditar = (estudiante) => {
    alert(`Función editar: ${estudiante.nombre_completo}`)
    // Aquí podrías abrir un formulario modal, por ejemplo
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Vista de Justificantes ({rol})</h2>
      <TablaEstudiantes
        estudiantes={estudiantes}
        onEditar={onEditar}
        obtenerEstudiantes={obtenerEstudiantes}
      />
    </div>
  )
}

export default VistaJustificantes
