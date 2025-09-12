"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (email === "admin@exemplo.com" && password === "123456") {
      const userData: User = {
        id: "1",
        name: "Usuário Admin",
        email: email,
        avatar: "/placeholder.svg?height=40&width=40",
        createdAt: new Date(),
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      setLoading(false)
      return { success: true }
    }

    setLoading(false)
    return { success: false, error: "Email ou senha incorretos" }
  }

  const register = async (name: string, email: string, password: string) => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (email.includes("@") && password.length >= 6) {
      const userData: User = {
        id: Date.now().toString(),
        name: name,
        email: email,
        avatar: "/placeholder.svg?height=40&width=40",
        createdAt: new Date(),
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      setLoading(false)
      return { success: true }
    }

    setLoading(false)
    return {
      success: false,
      error: "Dados inválidos. Verifique se o email é válido e a senha tem pelo menos 6 caracteres.",
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
