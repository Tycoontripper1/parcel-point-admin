"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { AgentsDataTable, DataTable, type Column } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserCheck, UserX, Clock } from "lucide-react"
import { StatCard } from "@/components/dashboard/startCard"
import { Agent } from "node:http"

interface Application {
  id: string
  phoneNumber: string
  emailAddress: string
  businessName: string
  dateRegistered: string
  category: "Agent" | "Driver"
}
const statsData = [
  {
    title: "Total No. of Applications",
    value: "2,500",
    change: "+5% from last month",
    icon: Users,
    iconColor: "text-blue-600",
  },
  {
    title: "Approved Applications",
    value: "2,000",
    change: "+8% from last month",
    icon: UserCheck,
    iconColor: "text-green-600",
  },
  {
    title: "Rejected Applications",
    value: "500",
    change: "-2% from last month",
    icon: UserX,
    iconColor: "text-red-600",
  },
  {
    title: "Pending Approval",
    value: "500",
    change: "+12% from last month",
    icon: Clock,
    iconColor: "text-yellow-600",
  },
]

const mockApplications: Application[] = [
  {
    id: "1",
    phoneNumber: "08011022534",
    emailAddress: "chinelomarcus@gmail.com",
    businessName: "Chinelomarcus Logistics",
    dateRegistered: "15-01-2025",
    category: "Agent",
  },
  {
    id: "2",
    phoneNumber: "08011022534",
    emailAddress: "chinelomarcus@gmail.com",
    businessName: "",
    dateRegistered: "15-01-2025",
    category: "Driver",
  },
  {
    id: "3",
    phoneNumber: "08011022534",
    emailAddress: "chinelomarcus@gmail.com",
    businessName: "Chinelomarcus Logistics",
    dateRegistered: "15-01-2025",
    category: "Agent",
  },
  {
    id: "4",
    phoneNumber: "08011022534",
    emailAddress: "chinelomarcus@gmail.com",
    businessName: "",
    dateRegistered: "15-01-2025",
    category: "Driver",
  },
  {
    id: "5",
    phoneNumber: "08011022534",
    emailAddress: "chinelomarcus@gmail.com",
    businessName: "",
    dateRegistered: "15-01-2025",
    category: "Driver",
  },
  {
    id: "6",
    phoneNumber: "08011022534",
    emailAddress: "chinelomarcus@gmail.com",
    businessName: "Chinelomarcus Logistics",
    dateRegistered: "15-01-2025",
    category: "Agent",
  },
  {
    id: "7",
    phoneNumber: "08011022534",
    emailAddress: "chinelomarcus@gmail.com",
    businessName: "Chinelomarcus Logistics",
    dateRegistered: "15-01-2025",
    category: "Agent",
  },
  {
    id: "8",
    phoneNumber: "08011022534",
    emailAddress: "chinelomarcus@gmail.com",
    businessName: "",
    dateRegistered: "15-01-2025",
    category: "Driver",
  },
]

export default function AgentsAndDriversPage() {
  const [applications] = useState<Application[]>(mockApplications)
  const [activeTab, setActiveTab] = useState("agents")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("all")
  const [showingCount, setShowingCount] = useState("10")
  const [dateFilter, setDateFilter] = useState("This Month")

  const columns: Column<Application>[] = [
    {
      key: "phoneNumber",
      label: "Phone Number",
      sortable: true,
    },
    {
      key: "emailAddress",
      label: "Email Address",
      sortable: true,
    },
    {
      key: "businessName",
      label: "Business Name",
      sortable: true,
      render: (value: string) => value || "-",
    },
    {
      key: "dateRegistered",
      label: "Date Registered",
      sortable: true,
    },
    {
      key: "category",
      label: "Category",
      sortable: true,
      render: (value: string) => <StatusBadge status={value === "Agent" ? "success" : "info"}>{value}</StatusBadge>,
    },
    {
      key: "actions",
      label: "Action",
      render: (_, row: Application) => (
        <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700 bg-transparent">
          View
        </Button>
      ),
    },
  ]

  // Filter applications based on search term
  const filteredApplications = applications.filter(
    (app) =>
      app.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.businessName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header with date selector */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title="Agents and Drivers" description="" />
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Select date range:</span>
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="This Month">This Month</SelectItem>
              <SelectItem value="Last Month">Last Month</SelectItem>
              <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Metric Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {statsData.map((stat, index) => (
           <StatCard
             key={index}
             title={stat.title}
             value={stat.value}
             change={stat.change}
           />
         ))}
       </div>
      {/* Tabs and Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-96">
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

    <TabsContent value="agents" className="space-y-4">
  {/* Applications Table */}
  <div className="bg-white rounded-lg border">
    <AgentsDataTable
      agents={filteredApplications}
      columns={columns}
      searchPlaceholder="Search applications..."
      showSearch={true}
      className="border-0"
    />
  </div>
</TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <div className="bg-white p-8 rounded-lg border text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Agents Management</h3>
            <p className="text-gray-600">View and manage all registered agents in the system.</p>
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <div className="bg-white p-8 rounded-lg border text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Drivers Management</h3>
            <p className="text-gray-600">View and manage all registered drivers in the system.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
