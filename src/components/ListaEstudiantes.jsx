// src/components/ListaEstudiantes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

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

  const estudiantesFiltrados = estudiantes.filter((est) => {
    const termino = busqueda.toLowerCase();
    return (
      est.numero_control.toLowerCase().includes(termino) ||
      est.nombre_completo.toLowerCase().includes(termino)
    );
  });

  return (
    <div>
      <h2>Lista de Estudiantes</h2>

      <input
        type="text"
        placeholder="Buscar por número de control o nombre"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          marginBottom: "1rem",
          padding: "8px",
          width: "100%",
          fontSize: "16px"
        }}
      />

      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
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
          {estudiantesFiltrados.map((est) => (
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
