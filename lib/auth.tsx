"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token on mount
    const token = localStorage.getItem("auth-token")
    const userData = localStorage.getItem("user-data")

    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user-data")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call - replace with actual authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication logic
    if (email === "admin@parcelpoint.com" && password === "admin123") {
      const userData: User = {
        id: "1",
        email,
        name: "Admin User",
        role: "admin",
      }

      localStorage.setItem("auth-token", "mock-jwt-token")
      localStorage.setItem("user-data", JSON.stringify(userData))
      setUser(userData)
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user-data")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}
