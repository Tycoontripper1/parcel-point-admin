"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <Card className="bg-white shadow-2xl max-w-md w-full">
        <CardContent className="p-8 text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-6">You don't have permission to access this resource.</p>
          <Link href="/login">
            <Button className="bg-[#AEFF8C] hover:bg-[#9EEF7C] text-gray-900">Back to Login</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
