"use client"
import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, Search, ArrowUpDown, ArrowUp, ArrowDown, Filter, Download } from "lucide-react"
import { cn, exportToCSV } from "@/lib/utils"
import { Agent, Dispute, statusOptions } from "@/constants/data"

type Column<T> =
  | {
      key: keyof T;
      label: string;
      sortable: true;
      render?: (value: any, row: T) => React.ReactNode;
    }
  | {
      key: string;
      label: string;
      sortable?: false;
      render?: (value: any, row: T) => React.ReactNode;
    };



interface Parcel {
  id: string
  trackingNumber: string
  sender: string
  recipient: string
  destination: string
  status: "pending" | "in-transit" | "delivered" | "failed"
  createdAt: string
  weight: string
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  searchPlaceholder?: string;
  showSearch?: boolean;
  className?: string;
  isLoading?: boolean;
  context?: 'parcel' | 'agent' | 'dispute';
}

export const DataTable = <T extends Parcel | Agent | Dispute>({
  data,
  columns,
  searchPlaceholder = 'Search...',
  showSearch = true,
  className = '',
  isLoading = false,
  context
}: DataTableProps<T>) => {
  // State management
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort data
  const filteredData = useMemo(() => {
    return data?.filter((item) => {
      const matchesSearch = Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
      const matchesStatus = statusFilter === "all" || 
        ('status' in item && item.status === statusFilter)
      return matchesSearch && matchesStatus
    })
  }, [data, searchTerm, statusFilter])

  const sortedData = useMemo(() => {
    if (!sortConfig?.key) return filteredData
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortConfig?.key, sortConfig?.direction])

  // Pagination
  const totalPages = Math.ceil(sortedData?.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedData = sortedData?.slice(startIndex, startIndex + pageSize)

  // Sorting handlers
  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig?.key === key) {
      direction = sortConfig.direction === 'asc' ? 'desc' : 'asc'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: keyof T) => {
    if (sortConfig?.key !== key) return <ArrowUpDown className="h-4 w-4" />
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="h-4 w-4" /> 
      : <ArrowDown className="h-4 w-4" />
  }

  // Row selection
  const toggleRowSelection = (id: string) => {
    const newSelected = new Set(selectedRows)
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id)
    setSelectedRows(newSelected)
  }

  const toggleSelectAll = () => {
    setSelectedRows(prev => 
      prev.size === paginatedData.length 
        ? new Set() 
        : new Set(paginatedData.map(item => item.id))
    )
  }

  // Export functionality
  const handleExport = () => {
    const dataToExport = selectedRows.size > 0 
      ? data.filter(item => selectedRows.has(item.id))
      : data
    exportToCSV(dataToExport, `${context}_export.csv`)
  }

  return (
    <div className={`w-full bg-white p-6 rounded-lg ${className}`}>
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {context} 
            <span className="text-[#AEFF8C] ml-2">{filteredData?.length}</span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(Number(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="w-16 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50].map(size => (
                  <SelectItem key={size} value={size.toString()}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>per page</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10 w-64"
              />
            </div>
          )}
          
          <div className="relative">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 p-2">
                <Select 
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <Button 
            className="bg-[#AEFF8C] hover:bg-[#9EEF7C] text-gray-900 flex items-center gap-2"
            onClick={handleExport}
            disabled={data?.length === 0}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.size > 0 && selectedRows.size === paginatedData.length}
                  onCheckedChange={toggleSelectAll}
                  className="data-[state=checked]:bg-[#AEFF8C] data-[state=checked]:text-gray-900"
                />
              </TableHead>
              {columns?.map((column) => (
                <TableHead key={column.key as string}>
                  <div 
                    className={cn(
                      "flex items-center",
                      column.sortable && "cursor-pointer hover:text-gray-900"
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    {column.label}
                    {column.sortable && (
                      <span className="ml-2">
                        {getSortIcon(column.key)}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData?.length > 0 ? (
              paginatedData?.map((row) => (
                <TableRow key={row.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(row.id)}
                      onCheckedChange={() => toggleRowSelection(row.id)}
                      className="data-[state=checked]:bg-[#AEFF8C] data-[state=checked]:text-gray-900"
                    />
                  </TableCell>
{columns?.map((column) => (
  <TableCell key={`${row.id}-${String(column.key)}`}>
    {column.render
      ? column.render(
          typeof column.key === "string" && !(column.key in row)
            ? undefined
            : row[column.key as keyof T],
          row
        )
      : String(
          typeof column.key === "string" && !(column.key in row)
            ? ""
            : row[column.key as keyof T]
        )}
  </TableCell>
))}

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                  No results found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, sortedData.length)} of {sortedData.length} entries
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1
                if (totalPages > 5 && currentPage > 3) {
                  pageNum = currentPage - 2 + i
                  if (pageNum > totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  }
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? "bg-[#AEFF8C] text-gray-900 hover:bg-[#9EEF7C]" : ""}
                  >
                    {pageNum}
                  </Button>
                )
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}