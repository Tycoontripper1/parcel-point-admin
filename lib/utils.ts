import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
/**
 * Exports data to CSV file
 * @param data Array of objects to export
 * @param filename Name of the file to download
 */
export function exportToCSV(data: any[], filename: string) {
  if (!data || data.length === 0) {
    console.error("No data to export")
    return
  }

  // Get headers from the first object
  const headers = Object.keys(data[0])
  
  // Process data into CSV rows
  const csvRows = []
  
  // Add header row
  csvRows.push(headers.join(','))
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header]
      // Escape quotes and wrap in quotes if contains commas
      const escaped = ('' + value).replace(/"/g, '\\"')
      return `"${escaped}"`
    })
    csvRows.push(values.join(','))
  }

  // Create CSV content
  const csvContent = csvRows.join('\n')
  
  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  
  // Trigger download
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Helper function to format date for CSV export
 */
export function formatDateForCSV(date: Date): string {
  return date.toISOString().split('T')[0] // YYYY-MM-DD format
}