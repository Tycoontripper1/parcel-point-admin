"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AuthLayout } from "@/lib/AuthLayouts"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitted(true)
  }

  return (
    <AuthLayout 
      title="Password Recovery" 
      subtitle="Enter the email address associated with your account to receive the password reset link."
    >
          <form className="p-8">
            {!isSubmitted ? (
              <>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-white">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ex: john@example.com"
                        className="pl-10 h-12 bg-white focus:border-[#AEFF8C] focus:ring-[#AEFF8C]"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={!email}
                    className="w-full h-12 bg-[#AEFF8C] hover:bg-[#9EEF7C] text-gray-900 font-medium text-base"
                  >
                    Send Reset Link
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-[#AEFF8C] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-gray-900" />
                </div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Check Your Email</h1>
                <p className="text-gray-600 mb-6">We've sent password reset instructions to {email}</p>
              </div>
            )}

            <div className="text-center mt-6">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-[#AEFF8C] hover:text-[#9EEF7C] font-medium"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </form>
    </AuthLayout>
  )
}
