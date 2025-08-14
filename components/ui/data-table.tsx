"use client"
import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft, ChevronRight, Search, ArrowUpDown, ArrowUp, ArrowDown, Filter, Download } from "lucide-react"
import { exportToCSV } from "@/lib/utils"
import { statusOptions } from "@/constants/data"

interface Agent {
  id: string
  name: string
  agentId: string
  phoneNumber: string
  emailAddress: string
  dateJoined: string
  status: "Active" | "Inactive"
  parcelsProcessed: string
}

export function AgentsDataTable({ agents }: { agents: Agent[] }) {
  // State management
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<keyof Agent | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort data
  const filteredData = useMemo(() => {
    return agents?.filter((agent) => {
      // Search filter
      const matchesSearch = Object.values(agent).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      // Status filter
      const matchesStatus = statusFilter === "all" || agent.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [agents, searchTerm, statusFilter])

  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData
    
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]
      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [filteredData, sortColumn, sortDirection])

  // Pagination
  const totalPages = Math.ceil(sortedData?.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedData = sortedData?.slice(startIndex, startIndex + pageSize)

  // Row selection
  const toggleRowSelection = (agentId: string) => {
    const newSelectedRows = new Set(selectedRows)
    newSelectedRows.has(agentId) ? newSelectedRows.delete(agentId) : newSelectedRows.add(agentId)
    setSelectedRows(newSelectedRows)
  }

  const toggleSelectAll = () => {
    setSelectedRows(prev => 
      prev.size === paginatedData?.length ? new Set() : new Set(paginatedData?.map(agent => agent.id))
    )
  }

  // Export functionality
  const handleExport = () => {
    const dataToExport = selectedRows.size > 0 
      ? agents.filter(agent => selectedRows.has(agent.id))
      : agents
    
    exportToCSV(dataToExport, "agents_export.csv")
  }

  // Implement this utility function in lib/utils.ts
  /*
  export function exportToCSV(data: any[], filename: string) {
    const headers = Object.keys(data[0]).join(",")
    const rows = data.map(obj => Object.values(obj).join(","))
    const csv = [headers, ...rows].join("\n")
    
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  */

  // Sorting
  const handleSort = (column: keyof Agent) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (column: keyof Agent) => {
    if (sortColumn !== column) return <ArrowUpDown className="h-4 w-4" />
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Agents <span className="text-[#AEFF8C]">{filteredData?.length}</span>
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Showing</span>
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
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 w-64"
            />
          </div>
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <Button 
            className="bg-[#AEFF8C] hover:bg-[#9EEF7C] text-gray-900 flex items-center gap-2"
            onClick={handleExport}
            disabled={agents?.length === 0}
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50 text-[14px]">
            <TableRow>
              <TableHead className="w-10 text-[14px]">
                <Checkbox
                  checked={selectedRows?.size === paginatedData?.length && paginatedData?.length > 0}
                  onCheckedChange={toggleSelectAll}
                  className="data-[state=checked]:bg-[#AEFF8C] data-[state=checked]:text-gray-900 border-gray-300"
                />
              </TableHead>
              {[
                { key: "name", label: "Name" },
                { key: "agentId", label: "Agent ID" },
                { key: "phoneNumber", label: "Phone Number" },
                { key: "emailAddress", label: "Email Address" },
                { key: "dateJoined", label: "Date Joined" },
                { key: "status", label: "Status" },
                { key: "parcelsProcessed", label: "Parcels Processed" }
              ].map((column) => (
                <TableHead key={column.key} className="font-semibold text-gray-700 text-[14px]">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(column.key as keyof Agent)}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    {column.label}
                    {getSortIcon(column.key as keyof Agent)}
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  No agents found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData?.map((agent) => (
                <TableRow key={agent.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.has(agent.id)}
                      onCheckedChange={() => toggleRowSelection(agent?.id)}
                      className="data-[state=checked]:bg-[#AEFF8C] data-[state=checked]:text-gray-900 border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">{agent.name}</TableCell>
                  <TableCell className="text-gray-600">{agent.agentId}</TableCell>
                  <TableCell className="text-gray-600">{agent.phoneNumber}</TableCell>
                  <TableCell className="text-gray-600">{agent.emailAddress}</TableCell>
                  <TableCell className="text-gray-600">{agent.dateJoined}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      agent.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {agent.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-600">{agent.parcelsProcessed}</TableCell>
                </TableRow>
              ))
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
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let page = i + 1
                if (totalPages > 5 && currentPage > 3) {
                  page = currentPage - 2 + i
                  if (page > totalPages) page = totalPages - 4 + i
                }
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={currentPage === page ? "bg-[#AEFF8C] text-gray-900 hover:bg-[#9EEF7C]" : ""}
                  >
                    {page}
                  </Button>
                )
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
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