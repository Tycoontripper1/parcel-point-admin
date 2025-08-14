"use client"

import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#AEFF8C]"></div>
      </div>
    )
  }

  return null
}
