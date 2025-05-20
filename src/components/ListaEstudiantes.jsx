// src/components/ListaEstudiantes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  const obtenerEstudiantes = () => {
    axios.get("http://localhost:5000/api/estudiantes")
      .then((res) => setEstudiantes(res.data))
      .catch((err) => console.error("Error al obtener estudiantes:", err));
  };

  useEffect(() => {
    obtenerEstudiantes();
  }, []);

  const eliminarEstudiante = async (numero_control) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar este estudiante?");
    if (!confirmacion) return;

    try {
      await axios.delete(`http://localhost:5000/api/estudiantes/${numero_control}`);
      alert("Estudiante eliminado correctamente");
      obtenerEstudiantes(); // Refrescar la lista
    } catch (error) {
      alert("Error al eliminar estudiante");
      console.error("Error al eliminar:", error);
    }
  };

  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número de Control</th>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Semestre</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((est) => (
            <tr key={est.id}>
              <td>{est.id}</td>
              <td>{est.numero_control}</td>
              <td>{est.nombre_completo}</td>
              <td>{est.carrera}</td>
              <td>{est.semestre}</td>
              <td>{est.correo}</td>
              <td>
                <button onClick={() => eliminarEstudiante(est.numero_control)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaEstudiantes;
