"use client"

import { useState } from "react"
import { useRol } from "../context/RolContext"
import { useNavigate } from "react-router-dom"
import { usuarios } from "../data/usuarios"

const Login = () => {
  const { setRol } = useRol()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!username || !password) {
      setError("Por favor ingresa usuario y contraseña")
      return
    }

    const user = usuarios.find((u) => u.username === username && u.password === password)

    if (user) {
      setRol(user.rol)
      navigate("/justificantes")
    } else {
      setError("Usuario o contraseña incorrectos")
    }
  }

  // Estilos inline para garantizar que se apliquen
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f0f9ff, #f5f3ff)",
      padding: "20px",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      width: "100%",
      maxWidth: "400px",
      padding: "32px",
    },
    header: {
      textAlign: "center",
      marginBottom: "24px",
    },
    title: {
      color: "#0369a1",
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    subtitle: {
      color: "#4b5563",
      fontSize: "16px",
    },
    errorMessage: {
      backgroundColor: "#fee2e2",
      color: "#dc2626",
      padding: "12px",
      borderRadius: "6px",
      marginBottom: "16px",
      fontSize: "14px",
      border: "1px solid rgba(220, 38, 38, 0.2)",
    },
    formGroup: {
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "500",
      color: "#374151",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      fontSize: "16px",
      transition: "all 0.2s",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#0369a1",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s",
      marginTop: "16px",
    },
    footer: {
      textAlign: "center",
      marginTop: "24px",
      color: "#6b7280",
      fontSize: "14px",
    },
    footerText: {
      marginBottom: "4px",
    },
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Sistema de Justificantes</h1>
          <p style={styles.subtitle}>Inicia sesión para continuar</p>
        </div>

        {error && <div style={styles.errorMessage}>{error}</div>}

        <div>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          <button onClick={handleLogin} style={styles.button}>
            Iniciar Sesión
          </button>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>Credenciales de prueba:</p>
          <p style={styles.footerText}>Usuario: admin | Contraseña: admin</p>
        </div>
      </div>
    </div>
  )
}

export default Login
