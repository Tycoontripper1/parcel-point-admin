"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DetailModal } from "@/components/ui/detail-modal"
import { ActionButtons } from "@/components/ui/action-buttons"
import { Search, Calendar, ChevronDown, CheckCircle } from "lucide-react"
import { disputesData } from "@/constants/data"
import { StatCard } from "@/components/dashboard/startCard"
import { DataTable } from "@/components/ui/data-table"

export type Priority = "Low" | "Medium" | "High";
export type Status = "Resolved" | "Unresolved" | "Escalated";

type Dispute = {
  id: string
  subject: string
  user: string
  priority: Priority
  date: string
  status: Status
}
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









export default function Ticket() {
  const [selectedTab, setSelectedTab] = useState("All")
  const [selectedDispute, setSelectedDispute] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const tabs = ["All", "Resolved", "Unresolved", "Escalated"]

  const filteredDisputes = disputesData?.filter((dispute) => {
    const matchesTab = selectedTab === "All" || dispute.status === selectedTab
    // const matchesSearch =
    //   dispute.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   dispute.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   dispute.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab 
  })

  const handleViewDispute = (dispute: any) => {
    setSelectedDispute(dispute)
    setIsModalOpen(true)
  }

  const handleMarkResolved = () => {
    // Handle mark as resolved logic
    setIsModalOpen(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "unresolved":
        return "bg-red-100 text-red-800"
      case "escalated":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  const disputeColumns: Column<Dispute>[] = [
  {
    key: "id",
    label: "Dispute ID",
    sortable: true
  },
  {
    key: "subject",
    label: "Dispute Subject",
    sortable: true
  },
  {
    key: "user",
    label: "User",
    sortable: true
  },
  {
    key: "priority",
    label: "Priority",
    sortable: true,
    render: (value) => <Badge className={getPriorityColor(value)}>{value}</Badge>
  },
  {
    key: "date",
    label: "Date",
    sortable: true
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (value) => <Badge className={getStatusColor(value)}>{value}</Badge>
  },
  {
    key: "id", // still needs a key, but we'll ignore value
    label: "Action",
    render: (_, row) => (
      <ActionButtons
        onView={() => handleViewDispute(row)}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    )
  }
]

  // Calculate metrics
  const allDisputes = disputesData.length
  const resolvedDisputes = disputesData.filter((d) => d.status === "Resolved").length
  const unresolvedDisputes = disputesData.filter((d) => d.status === "Unresolved").length

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ticket"
        description=""
      />


      {/* Main Content */}
          {/* Tab Navigation */}
          <div className="flex space-x-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab
                    ? "border-blue-500 text-[#213264]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        <div className="bg-white rounded-lg border">
       <DataTable
        data={filteredDisputes}
        columns={disputeColumns}
        searchPlaceholder="Search tickets..."
        className="bg-white rounded-lg shadow"
        context={'dispute'}
      />
        </div>

      {/* Dispute Detail Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Dispute and Support Resolution"
        actions={
          <Button onClick={handleMarkResolved} className="w-full bg-[#AEFF8C] hover:bg-[#9EEF7C] text-gray-900">
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark as resolved
          </Button>
        }
      >
        {selectedDispute && (
          <div className="space-y-6">
            {/* Dispute ID */}
            <div>
              <label className="text-sm text-gray-600">Dispute ID</label>
              <div className="text-lg font-semibold text-gray-900 mt-1">#{selectedDispute.id}</div>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <div>
                <label className="text-sm text-gray-600">User:</label>
                <span className="ml-2 font-medium">{selectedDispute.user}</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">{selectedDispute.userType}</Badge>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Date logged:</label>
                <div className="font-medium mt-1">{selectedDispute.date}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Priority:</label>
                <div className="mt-1">
                  <Badge className={getPriorityColor(selectedDispute.priority)}>{selectedDispute.priority}</Badge>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Category:</label>
                <div className="font-medium mt-1">{selectedDispute.category}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Status:</label>
                <div className="mt-1">
                  <Badge className={getStatusColor(selectedDispute.status)}>{selectedDispute.status}</Badge>
                </div>
              </div>
            </div>

            {/* Feedback */}
            <div>
              <label className="text-sm text-gray-600 block mb-2">Write a Feedback</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                rows={4}
                defaultValue={selectedDispute.feedback}
                placeholder="Enter your feedback here..."
              />
            </div>
          </div>
        )}
      </DetailModal>
    </div>
  )
}
