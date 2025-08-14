"use client"

import type React from "react"
import { useState } from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="h-screen flex bg-gray-50">
        {/* Desktop Sidebar - Fixed width */}
        <div className="hidden lg:block">
          <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        </div>

        {/* Mobile Sidebar */}
        <MobileSidebar open={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

        {/* Main Content Area - Flex column with overflow handling */}
        <div className={cn(
          "flex-1 flex flex-col min-w-0", // min-w-0 prevents flex overflow issues
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64" // Match sidebar widths
        )}>
          {/* Fixed Header */}
          <Header onMenuClick={() => setMobileSidebarOpen(true)} />

          {/* Scrollable Content Area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
            <div className="max-w-full mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

// Add this helper if not already in your project
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}