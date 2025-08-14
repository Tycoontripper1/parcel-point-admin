"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { DataTable, type Column } from "@/components/ui/data-table"
import { StatusBadge } from "@/components/ui/status-badge"
import { ActionButtons } from "@/components/ui/action-buttons"
import { Modal } from "@/components/ui/modal"
import { TextField, SelectField } from "@/components/ui/form-field"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  totalParcels: number
  status: "active" | "inactive"
  joinedAt: string
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY",
    totalParcels: 15,
    status: "active",
    joinedAt: "2024-03-15",
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane.doe@email.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Los Angeles, CA",
    totalParcels: 8,
    status: "active",
    joinedAt: "2024-05-22",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@email.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, Chicago, IL",
    totalParcels: 3,
    status: "inactive",
    joinedAt: "2024-01-10",
  },
]

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [showAddModal, setShowAddModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
  })

  const columns: Column<Customer>[] = [
    {
      key: "name",
      label: "Name",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "phone",
      label: "Phone",
      sortable: true,
    },
    {
      key: "address",
      label: "Address",
      sortable: true,
    },
    {
      key: "totalParcels",
      label: "Total Parcels",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => (
        <StatusBadge status={value === "active" ? "success" : "error"}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </StatusBadge>
      ),
    },
    {
      key: "joinedAt",
      label: "Joined",
      sortable: true,
    },
    // {
    //   key: "actions",
    //   label: "Actions",
    //   render: (_, row: Customer) => (
    //     <ActionButtons
    //       onView={() => console.log("View", row.id)}
    //       onEdit={() => console.log("Edit", row.id)}
    //       onDelete={() => console.log("Delete", row.id)}
    //     />
    //   ),
    // },
  ]

  const handleAddCustomer = () => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      totalParcels: 0,
      status: formData.status as "active" | "inactive",
      joinedAt: new Date().toISOString().split("T")[0],
    }
    setCustomers([...customers, newCustomer])
    setFormData({ name: "", email: "", phone: "", address: "", status: "active" })
    setShowAddModal(false)
  }

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Manage customer accounts and information"
        action={{
          label: "Add Customer",
          onClick: () => setShowAddModal(true),
          icon: <Plus className="h-4 w-4 mr-2" />,
        }}
      />

      <DataTable
        data={customers}
        columns={columns}
        searchPlaceholder="Search customers..."
        className="bg-white rounded-lg shadow"
      />

      {/* Add Customer Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Customer"
        description="Enter the customer details"
      >
        <div className="space-y-4">
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Enter customer name"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            placeholder="Enter email address"
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={(value) => setFormData({ ...formData, phone: value })}
            placeholder="Enter phone number"
            required
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={(value) => setFormData({ ...formData, address: value })}
            placeholder="Enter full address"
            required
          />
          <SelectField
            label="Status"
            name="status"
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value })}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            required
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomer} className="bg-[#AEFF8C] text-gray-900 hover:bg-[#9EEF7C]">
              Add Customer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
