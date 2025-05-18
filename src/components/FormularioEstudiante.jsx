// frontend/components/FormularioEstudiante.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormularioEstudiante = ({ obtenerEstudiantes, estudianteEditar }) => {
  const [formData, setFormData] = useState({
    numero_control: '',
    nombre_completo: '',
    carrera: '',
    semestre: '',
    correo: ''
  });

  const [editandoId, setEditandoId] = useState(null);

  // Cargar datos en el formulario si estamos editando
  useEffect(() => {
    if (estudianteEditar) {
      setFormData({
        numero_control: estudianteEditar.numero_control || '',
        nombre_completo: estudianteEditar.nombre_completo || '',
        carrera: estudianteEditar.carrera || '',
        semestre: estudianteEditar.semestre || '',
        correo: estudianteEditar.correo || ''
      });
      setEditandoId(estudianteEditar.id);
    }
  }, [estudianteEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.numero_control || !formData.nombre_completo || !formData.carrera || !formData.semestre || !formData.correo) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (formData.numero_control.length < 8) {
      alert("El número de control debe tener al menos 8 caracteres.");
      return;
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(formData.correo)) {
      alert("El correo no es válido.");
      return;
    }

    try {
      if (editandoId) {
        await axios.put(`http://localhost:5000/api/estudiantes/${editandoId}`, formData);
        alert("Estudiante actualizado exitosamente");
      } else {
        await axios.post("http://localhost:5000/api/estudiantes", formData);
        alert("Estudiante registrado exitosamente");
      }

      // Limpia el formulario
      setFormData({
        numero_control: '',
        nombre_completo: '',
        carrera: '',
        semestre: '',
        correo: ''
      });
      setEditandoId(null);

      if (obtenerEstudiantes) {
        obtenerEstudiantes(); // refresca la tabla
      }

    } catch (error) {
      console.error("Error al guardar estudiante:", error);
      alert("Ocurrió un error al guardar el estudiante");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editandoId ? 'Editar Estudiante' : 'Registrar Estudiante'}</h2>
      <input
        type="text"
        name="numero_control"
        placeholder="Número de Control"
        value={formData.numero_control}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="nombre_completo"
        placeholder="Nombre Completo"
        value={formData.nombre_completo}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="carrera"
        placeholder="Carrera"
        value={formData.carrera}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="semestre"
        placeholder="Semestre"
        value={formData.semestre}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="correo"
        placeholder="Correo"
        value={formData.correo}
        onChange={handleChange}
        required
      />
      <button type="submit">{editandoId ? 'Actualizar' : 'Registrar'}</button>
    </form>
  );
};

export default FormularioEstudiante;
