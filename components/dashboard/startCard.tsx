"use client"

import React from "react"
import { cn } from "@/lib/utils" // Ensure you have this utility or create it

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  className?: string
  titleClassName?: string
  valueClassName?: string
  changeClassName?: string
}

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      change,
      className,
      titleClassName,
      valueClassName,
      changeClassName,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-[10px] border border-[#E9EAEB]",
          className
        )}
      >
        <div className={cn("text-sm p-2 text-[#717680]", titleClassName)}>
          {title}
        </div>
        <div className="border-t bg-gray-100 px-2 py-4 flex justify-between items-center">
          <div className={cn(
            "text-[18px] font-bold text-gray-900 mb-1",
            valueClassName
          )}>
            {value}
          </div>
          {change && (
            <div className={cn("text-[8px] text-gray-500", changeClassName)}>
              {change}
            </div>
          )}
        </div>
      </div>
    )
  }
)

StatCard.displayName = "StatCard"