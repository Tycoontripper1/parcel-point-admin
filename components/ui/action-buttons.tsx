"use client"

import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ActionButtonsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
  viewLabel?: string
  editLabel?: string
  deleteLabel?: string
}

export function ActionButtons({
  onView,
  onEdit,
  onDelete,
  viewLabel = "View",
  editLabel = "Edit",
  deleteLabel = "Delete",
}: ActionButtonsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onView && (
          <DropdownMenuItem onClick={onView}>
            <Eye className="h-4 w-4 mr-2" />
            {viewLabel}
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            {editLabel}
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem onClick={onDelete} className="text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            {deleteLabel}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface QuickActionsProps {
  onView?: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export function QuickActions({ onView, onEdit, onDelete }: QuickActionsProps) {
  return (
    <div className="flex items-center gap-1">
      {onView && (
        <Button variant="ghost" size="sm" onClick={onView}>
          <Eye className="h-4 w-4" />
        </Button>
      )}
      {onEdit && (
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4" />
        </Button>
      )}
      {onDelete && (
        <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-600 hover:text-red-700">
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
