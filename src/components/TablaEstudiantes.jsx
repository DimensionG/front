"use client"
import axios from "axios"

const TablaEstudiantes = ({ estudiantes, onEditar, obtenerEstudiantes }) => {
  const eliminarEstudiante = async (numero_control) => {
    if (window.confirm("¿Estás seguro de eliminar este estudiante?")) {
      try {
        await axios.delete(`http://localhost:5000/api/estudiantes/${numero_control}`)
        alert("Estudiante eliminado correctamente")
        // Ahora obtenerEstudiantes está disponible como prop
        obtenerEstudiantes() // Refresca la lista
      } catch (error) {
        alert("Error al eliminar el estudiante")
        console.error(error)
      }
    }
  }

  return (
    <table border={1} cellPadding={8}>
      <thead>
        <tr>
          <th>No. Control</th>
          <th>Nombre</th>
          <th>Carrera</th>
          <th>Semestre</th>
          <th>Correo</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {estudiantes.map((estudiante) => (
          <tr key={estudiante.id}>
            <td>{estudiante.numero_control}</td>
            <td>{estudiante.nombre_completo}</td>
            <td>{estudiante.carrera}</td>
            <td>{estudiante.semestre}</td>
            <td>{estudiante.correo}</td>
            <td>
              <button onClick={() => onEditar(estudiante)}>Editar</button>
              <button onClick={() => eliminarEstudiante(estudiante.numero_control)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TablaEstudiantes
