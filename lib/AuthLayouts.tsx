"use client"

import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import logo from "@/public/images/logo.png"
import Image from "next/image"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  footer?: ReactNode
}

export function AuthLayout({ children, title, subtitle, footer }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#213264] border-8 border-[#fff] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center  justify-center flex">
         <Image src={logo} alt="logo" className="w-48 " />
        </div>

        {/* Auth Card */}
        <div className="">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold text-white mb-2">{title}</h1>
              {subtitle && <p className="text-[#FAFAFA] text-[16px] font-normal">{subtitle}</p>}
            </div>

            {children}
          </CardContent>
        </div>

        {/* Footer */}
        {footer || (
          <div className="text-center ">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} ParcelPoint</p>
          </div>
        )}
      </div>
    </div>
  )
}