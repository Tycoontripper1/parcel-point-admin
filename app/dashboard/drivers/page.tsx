"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { DataTable, type Column } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { ActionButtons } from "@/components/ui/action-buttons"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, MapPin, Clock } from "lucide-react"

interface Driver {
  id: string
  name: string
  email: string
  phone: string
  vehicle: string
  zone: string
  status: "online" | "offline" | "busy"
  deliveries: number
  rating: number
  joinedAt: string
}

const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "Alex Rodriguez",
    email: "alex.rodriguez@parcelpoint.com",
    phone: "+1 (555) 111-2222",
    vehicle: "Van - PP001",
    zone: "Zone A",
    status: "online",
    deliveries: 45,
    rating: 4.8,
    joinedAt: "2024-02-15",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@parcelpoint.com",
    phone: "+1 (555) 333-4444",
    vehicle: "Truck - PP002",
    zone: "Zone B",
    status: "busy",
    deliveries: 38,
    rating: 4.9,
    joinedAt: "2024-03-20",
  },
  {
    id: "3",
    name: "David Chen",
    email: "david.chen@parcelpoint.com",
    phone: "+1 (555) 555-6666",
    vehicle: "Van - PP003",
    zone: "Zone C",
    status: "offline",
    deliveries: 22,
    rating: 4.6,
    joinedAt: "2024-04-10",
  },
]

export default function DriversPage() {
  const [drivers] = useState<Driver[]>(mockDrivers)

  const columns: Column<Driver>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "vehicle",
      label: "Vehicle",
      sortable: true,
    },
    {
      key: "zone",
      label: "Zone",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => {
        const statusMap = {
          online: "success",
          busy: "warning",
          offline: "error",
        } as const
        return (
          <StatusBadge status={statusMap[value as keyof typeof statusMap]}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </StatusBadge>
        )
      },
    },
    {
      key: "deliveries",
      label: "Deliveries",
      sortable: true,
    },
    {
      key: "rating",
      label: "Rating",
      sortable: true,
      render: (value: number) => `${value}/5.0`,
    },
    // {
    //   key: "actions",
    //   label: "Actions",
    //   render: (_, row: Driver) => (
    //     <ActionButtons onView={() => console.log("View", row.id)} onEdit={() => console.log("Edit", row.id)} />
    //   ),
    // },
  ]

  const onlineDrivers = drivers.filter((d) => d.status === "online").length
  const busyDrivers = drivers.filter((d) => d.status === "busy").length
  const totalDeliveries = drivers.reduce((sum, d) => sum + d.deliveries, 0)

  return (
    <div className="space-y-6">
      <PageHeader title="Drivers" description="Manage delivery drivers and their assignments" />

      {/* Driver Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Online Drivers</CardTitle>
            <Truck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{onlineDrivers}</div>
            <p className="text-xs text-green-600 mt-1">Ready for deliveries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Busy Drivers</CardTitle>
            <MapPin className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{busyDrivers}</div>
            <p className="text-xs text-yellow-600 mt-1">Currently delivering</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Deliveries</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalDeliveries}</div>
            <p className="text-xs text-blue-600 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Drivers Table */}
      <DataTable
        data={drivers}
        columns={columns}
        searchPlaceholder="Search drivers..."
        className="bg-white rounded-lg shadow"
      />
    </div>
  )
}
