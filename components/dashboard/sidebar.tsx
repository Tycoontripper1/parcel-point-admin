"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Package,
  CreditCard,
  FileText,
  Ticket,
  BarChart3,
  UserCheck,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import Image from "next/image"
import logo from "@/public/images/logo2.png"
import React from "react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Agents and Drivers", href: "/dashboard/agents-drivers", icon: Users },
  { name: "Parcel Management", href: "/dashboard/parcels", icon: Package },
    { name: "Dispute and Support", href: "/dashboard/dispute", icon: FileText },
  { name: "Payment Management", href: "/dashboard/payments", icon: CreditCard },

  { name: "Reports and Support", href: "/dashboard/reports-support-2", icon: FileText },
  { name: "Reports and Support", href: "/dashboard/reports-support-3", icon: FileText },
  { name: "Tickets", href: "/dashboard/tickets", icon: Ticket },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { name: "User Management", href: "/dashboard/users", icon: UserCheck },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell, hasNotification: true },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <div
      className={cn(
        "bg-gray-100 border-r border-gray-200 flex flex-col h-screen fixed",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Fixed Logo */}
      <div className="text-center py-4 justify-center flex border-b border-gray-200">
        <Image 
          src={logo} 
          alt="logo" 
          className={cn(
            "transition-all duration-300",
            collapsed ? "w-10" : "w-48"
          )} 
        />
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="space-y-1 px-2">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <Link key={`${item.name}-${index}`} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-4 px-3 py-2 rounded-lg text-sm font-medium transition-colors relative",
                    isActive 
                      ? "bg-[#AEFF8C] text-gray-900" 
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-200",
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="truncate">{item.name}</span>
                      {item.hasNotification && (
                        <div className="ml-auto w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                    </>
                  )}
                  {collapsed && item.hasNotification && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Fixed Bottom Area */}
      <div className="mt-auto border-t border-gray-200">
        {/* Collapse Toggle - Hidden on mobile */}

        {/* Logout */}
        <div className="p-2">
          <Button
            onClick={logout}
            className={cn(
              "w-full bg-[#AEFF8C] hover:bg-[#9EEF7C] text-gray-900 font-medium",
              collapsed ? "justify-center px-2" : "justify-start",
            )}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}