// Status filter options
export const statusOptions = [
  { value: "all", label: "All Statuses" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" }
]

// Table column definitions
export const agentTableColumns = [
  { key: "name", label: "Name", sortable: true },
  { key: "agentId", label: "Agent ID", sortable: true },
  { key: "phoneNumber", label: "Phone Number", sortable: true },
  { key: "emailAddress", label: "Email Address", sortable: true },
  { key: "dateJoined", label: "Date Joined", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "parcelsProcessed", label: "Parcels Processed", sortable: true }
]

// Page size options
export const pageSizeOptions = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" }
]

// Default export settings
export const defaultExportSettings = {
  filenamePrefix: "agents_export_",
  dateFormat: "YYYY-MM-DD",
  includeHeaders: true
}