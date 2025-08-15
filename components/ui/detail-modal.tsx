"use client"

import { useEffect, useState, type ReactNode } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DetailModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
  actions?: ReactNode
}

export function DetailModal({ isOpen, onClose, title, children, actions }: DetailModalProps) {
  const [show, setShow] = useState(false)

  // Trigger animation when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10) // small delay to allow transition
    } else {
      setShow(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[#09090B40] p-6 flex justify-end z-50">
      {/* Click outside to close */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Modal Drawer */}
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full sm:w-[400px] max-h-screen overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Actions */}
        {actions && <div className="px-6 pb-6 border-t border-gray-200 pt-4">{actions}</div>}
      </div>
    </div>
  )
}
