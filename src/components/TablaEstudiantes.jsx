// src/components/TablaEstudiantes.jsx
import React from 'react';

const TablaEstudiantes = ({ estudiantes, onEditar }) => {
  return (
    <table>
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
        {estudiantes.map(estudiante => (
          <tr key={estudiante.id}>
            <td>{estudiante.numero_control}</td>
            <td>{estudiante.nombre_completo}</td>
            <td>{estudiante.carrera}</td>
            <td>{estudiante.semestre}</td>
            <td>{estudiante.correo}</td>
            <td>
              <button onClick={() => onEditar(estudiante)}>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaEstudiantes;
