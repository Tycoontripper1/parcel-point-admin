"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { LayoutDashboard, Package, Users, Truck, BarChart3, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/lib/auth"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Parcels", href: "/dashboard/parcels", icon: Package },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Drivers", href: "/dashboard/drivers", icon: Truck },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface MobileSidebarProps {
  open: boolean
  onClose: () => void
}

export function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="p-4 border-b border-gray-200">
          <SheetTitle className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#AEFF8C] rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-[#AEFF8C] rounded-full"></div>
              </div>
            </div>
            <span className="font-semibold text-gray-900">ParcelPoint</span>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href} onClick={onClose}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-[#AEFF8C] text-gray-900" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
