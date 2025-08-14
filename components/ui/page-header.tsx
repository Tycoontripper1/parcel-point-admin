"use client"

import type React from "react"

import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    icon?: React.ReactNode
  }
  children?: React.ReactNode
}

export function PageHeader({ title, description, action, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>
      <div className="flex items-center gap-3">
        {children}
        {action && (
          <Button onClick={action.onClick} className="bg-[#AEFF8C] text-gray-900 hover:bg-[#9EEF7C]">
            {action.icon}
            {action.label}
          </Button>
        )}
      </div>
    </div>
  )
}
