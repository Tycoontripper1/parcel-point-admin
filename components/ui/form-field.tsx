"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface BaseFieldProps {
  label: string
  name: string
  required?: boolean
  error?: string
  className?: string
}

interface TextFieldProps extends BaseFieldProps {
  type?: "text" | "email" | "password" | "number"
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

interface TextareaFieldProps extends BaseFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

interface SelectFieldProps extends BaseFieldProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  options: { value: string; label: string }[]
}

export function TextField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  error,
  className,
}: TextFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "focus:border-[#AEFF8C] focus:ring-[#AEFF8C]",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        )}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

export function TextareaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 3,
  required,
  error,
  className,
}: TextareaFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "focus:border-[#AEFF8C] focus:ring-[#AEFF8C]",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500",
        )}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

export function SelectField({
  label,
  name,
  value,
  onChange,
  placeholder,
  options,
  required,
  error,
  className,
}: SelectFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger
          className={cn(
            "focus:border-[#AEFF8C] focus:ring-[#AEFF8C]",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
