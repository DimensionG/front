// src/components/ListaEstudiantes.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/estudiantes")
      .then((res) => setEstudiantes(res.data))
      .catch((err) => console.error("Error al obtener estudiantes:", err));
  }, []);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaEstudiantes;
