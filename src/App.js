import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormularioEstudiante from './components/FormularioEstudiante';
import TablaEstudiantes from './components/TablaEstudiantes';

const App = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudianteEditar, setEstudianteEditar] = useState(null);

  const obtenerEstudiantes = async () => {
    const response = await axios.get("http://localhost:5000/api/estudiantes");
    setEstudiantes(response.data);
  };

  useEffect(() => {
    obtenerEstudiantes();
  }, []);

  return (
    <div>
      <h1>Gestor de Estudiantes</h1>
      <FormularioEstudiante obtenerEstudiantes={obtenerEstudiantes} estudianteEditar={estudianteEditar} />
      <TablaEstudiantes estudiantes={estudiantes} onEditar={setEstudianteEditar} />
    </div>
  );
};

export default App;
