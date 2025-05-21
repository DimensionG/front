import { createContext, useContext, useState } from "react"

// Creamos el contexto
const RolContext = createContext()

// Este será el proveedor del contexto que envolverá tu app
export const RolProvider = ({ children }) => {
  const [rol, setRol] = useState(null)         // 'enfermeria' o 'coordinacion'
  const [usuario, setUsuario] = useState(null) // Nombre del usuario (opcional)
  const [logueado, setLogueado] = useState(false)

  const login = (usuario, rol) => {
    setUsuario(usuario)
    setRol(rol)
    setLogueado(true)
  }

  const logout = () => {
    setUsuario(null)
    setRol(null)
    setLogueado(false)
  }

  return (
    <RolContext.Provider value={{ rol, usuario, logueado, login, logout }}>
      {children}
    </RolContext.Provider>
  )
}

// Hook para usar el contexto fácilmente en cualquier componente
export const useRol = () => useContext(RolContext)
