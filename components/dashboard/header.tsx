"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Menu, Search, ChevronDown } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React from "react"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth()
  const [notificationsOpen, setNotificationsOpen] = React.useState(false)

  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: "New parcel received",
      description: "You have 5 new parcels waiting for processing",
      time: "2 mins ago",
      read: false,
    },
    {
      id: 2,
      title: "System update",
      description: "New dashboard features available",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 3,
      title: "Payment processed",
      description: "Your payment of ₦25,000 has been processed",
      time: "3 hours ago",
      read: true,
    },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onMenuClick} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo - visible on mobile when sidebar is collapsed */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="w-8 h-8 bg-[#AEFF8C] rounded-full flex items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-[#AEFF8C] rounded-full"></div>
              </div>
            </div>
            <span className="font-semibold text-gray-900 text-lg">ParcelPoint</span>
          </div>

          {/* Search */}
          <div className="relative hidden md:block ml-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              className="pl-10 w-80 bg-gray-50 border-gray-200 focus:bg-white rounded-lg"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative p-2">
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 mr-2 mt-2" align="end">
              <div className="border-b px-4 py-3">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border-b px-4 py-3 hover:bg-gray-50 cursor-pointer ${!notification.read ? "bg-blue-50" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900 text-[14px]">{notification.title}</h4>
                      {!notification.read && (
                        <span className="inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-600 mt-1">{notification.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="border-t px-4 py-2 text-center">
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* User Profile */}
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-[#AEFF8C] text-gray-900 text-sm font-medium">AO</AvatarFallback>
            </Avatar>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900">Alex Okunrobo</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400 hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="mt-3 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10 w-full bg-gray-50 border-gray-200 focus:bg-white rounded-lg"
          />
        </div>
      </div>
    </header>
  )
}