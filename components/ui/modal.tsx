"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  size?: "sm" | "md" | "lg" | "xl"
  showCloseButton?: boolean
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = "md",
  showCloseButton = true,
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={sizeClasses[size]}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription className="mt-1">{description}</DialogDescription>}
            </div>
            {showCloseButton && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogHeader>
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  )
}

interface ConfirmModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={variant === "destructive" ? "destructive" : "default"}
            className={variant === "default" ? "bg-[#AEFF8C] text-gray-900 hover:bg-[#9EEF7C]" : ""}
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
