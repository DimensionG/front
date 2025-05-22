"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const FormularioEstudiante = ({ obtenerEstudiantes, estudianteEditar }) => {
  const [formData, setFormData] = useState({
    numero_control: "",
    nombre_completo: "",
    carrera: "",
    semestre: "",
    correo: "",
  })

  const [editandoId, setEditandoId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Cargar datos en el formulario si estamos editando
  useEffect(() => {
    if (estudianteEditar) {
      setFormData({
        numero_control: estudianteEditar.numero_control || "",
        nombre_completo: estudianteEditar.nombre_completo || "",
        carrera: estudianteEditar.carrera || "",
        semestre: estudianteEditar.semestre || "",
        correo: estudianteEditar.correo || "",
      })
      setEditandoId(estudianteEditar.id)
    }
  }, [estudianteEditar])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    // Validaciones básicas
    if (
      !formData.numero_control ||
      !formData.nombre_completo ||
      !formData.carrera ||
      !formData.semestre ||
      !formData.correo
    ) {
      setError("Por favor, completa todos los campos.")
      setLoading(false)
      return
    }

    if (formData.numero_control.length < 8) {
      setError("El número de control debe tener al menos 8 caracteres.")
      setLoading(false)
      return
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!correoValido.test(formData.correo)) {
      setError("El correo no es válido.")
      setLoading(false)
      return
    }

    try {
      if (editandoId) {
        await axios.put(`http://localhost:5000/api/estudiantes/${editandoId}`, formData)
        setSuccess("Estudiante actualizado exitosamente")
      } else {
        await axios.post("http://localhost:5000/api/estudiantes", formData)
        setSuccess("Estudiante registrado exitosamente")
      }

      // Limpia el formulario
      setFormData({
        numero_control: "",
        nombre_completo: "",
        carrera: "",
        semestre: "",
        correo: "",
      })
      setEditandoId(null)

      if (obtenerEstudiantes) {
        obtenerEstudiantes() // refresca la tabla
      }
    } catch (error) {
      console.error("Error al guardar estudiante:", error)
      setError("Ocurrió un error al guardar el estudiante")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card mb-lg">
      <h2 className="text-primary">{editandoId ? "Editar Estudiante" : "Registrar Estudiante"}</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="grid">
          <div className="form-group">
            <label htmlFor="numero_control" className="form-label">
              Número de Control
            </label>
            <input
              id="numero_control"
              type="text"
              name="numero_control"
              className="form-input"
              placeholder="Ej. 20215678"
              value={formData.numero_control}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre_completo" className="form-label">
              Nombre Completo
            </label>
            <input
              id="nombre_completo"
              type="text"
              name="nombre_completo"
              className="form-input"
              placeholder="Ej. Juan Pérez García"
              value={formData.nombre_completo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="carrera" className="form-label">
              Carrera
            </label>
            <input
              id="carrera"
              type="text"
              name="carrera"
              className="form-input"
              placeholder="Ej. Ingeniería en Sistemas"
              value={formData.carrera}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="semestre" className="form-label">
              Semestre
            </label>
            <input
              id="semestre"
              type="number"
              name="semestre"
              className="form-input"
              placeholder="Ej. 5"
              min="1"
              max="12"
              value={formData.semestre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo" className="form-label">
              Correo Electrónico
            </label>
            <input
              id="correo"
              type="email"
              name="correo"
              className="form-input"
              placeholder="Ej. estudiante@ejemplo.com"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="text-right mt-lg">
          <button type="submit" className={`btn ${editandoId ? "btn-secondary" : "btn-primary"}`} disabled={loading}>
            {loading ? "Procesando..." : editandoId ? "Actualizar" : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormularioEstudiante
