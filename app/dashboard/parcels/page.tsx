"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import {  DataTable, } from "@/components/ui/data-table"
import { StatusBadge, type StatusType } from "@/components/ui/status-badge"
import { Modal, ConfirmModal } from "@/components/ui/modal"
import { TextField } from "@/components/ui/form-field"
import { Button } from "@/components/ui/button"
import { ActionButtons } from "@/components/ui/action-buttons"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

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



const mockParcels: Parcel[] = [
  {
    id: "1",
    trackingNumber: "PP001234567",
    sender: "John Smith",
    recipient: "Jane Doe",
    destination: "New York, NY",
    status: "delivered",
    createdAt: "2025-01-08",
    weight: "2.5 kg",
  },
  {
    id: "2",
    trackingNumber: "PP001234568",
    sender: "Alice Johnson",
    recipient: "Bob Wilson",
    destination: "Los Angeles, CA",
    status: "in-transit",
    createdAt: "2025-01-07",
    weight: "1.2 kg",
  },
  {
    id: "3",
    trackingNumber: "PP001234569",
    sender: "Mike Brown",
    recipient: "Sarah Davis",
    destination: "Chicago, IL",
    status: "pending",
    createdAt: "2025-01-06",
    weight: "3.8 kg",
  },
  {
    id: "4",
    trackingNumber: "PP001234570",
    sender: "Tom Anderson",
    recipient: "Lisa Garcia",
    destination: "Houston, TX",
    status: "failed",
    createdAt: "2025-01-05",
    weight: "0.8 kg",
  },
]

const statusMap: Record<string, StatusType> = {
  pending: "pending",
  "in-transit": "info",
  delivered: "success",
  failed: "error",
}

export default function ParcelsPage() {
  const [parcels, setParcels] = useState<Parcel[]>(mockParcels)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null)
  const [formData, setFormData] = useState({
    sender: "",
    recipient: "",
    destination: "",
    weight: "",
  })
  const router = useRouter()

  const columns: Column<Parcel>[] = [
    {
      key: "trackingNumber",
      label: "Tracking Number",
      sortable: true,
    },
    {
      key: "sender",
      label: "Sender",
      sortable: true,
    },
    {
      key: "recipient",
      label: "Recipient",
      sortable: true,
    },
    {
      key: "destination",
      label: "Destination",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value: string) => (
        <StatusBadge status={statusMap[value]}>
          {value.charAt(0).toUpperCase() + value.slice(1).replace("-", " ")}
        </StatusBadge>
      ),
    },
    {
      key: "weight",
      label: "Weight",
      sortable: true,
    },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_:any, row: Parcel) => (
        <ActionButtons
          onView={() => router.push(`/dashboard/parcels/${row.id}`)}
          onEdit={() => console.log("Modify", row.id)}
          onDelete={() => {
            setSelectedParcel(row)
            setShowDeleteModal(true)
          }}
        />
      ),
    },
  ]

  const handleAddParcel = () => {
    const newParcel: Parcel = {
      id: Date.now().toString(),
      trackingNumber: `PP${Date.now()}`,
      sender: formData.sender,
      recipient: formData.recipient,
      destination: formData.destination,
      weight: formData.weight,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setParcels([...parcels, newParcel])
    setFormData({ sender: "", recipient: "", destination: "", weight: "" })
    setShowAddModal(false)
  }

  const handleDeleteParcel = () => {
    if (selectedParcel) {
      setParcels(parcels.filter((p) => p.id !== selectedParcel.id))
      setSelectedParcel(null)
      setShowDeleteModal(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="Parcels"
        description="Manage and track all parcels in the system"
        action={{
          label: "Add Parcel",
          onClick: () => setShowAddModal(true),
          icon: <Plus className="h-4 w-4 mr-2" />,
        }}
      />

      <DataTable
        data={parcels}
        columns={columns}
        searchPlaceholder="Search parcels..."
        className="bg-white rounded-lg shadow"
        context={'parcel'}
      />

      {/* Add Parcel Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Parcel"
        description="Enter the details for the new parcel"
        showCloseButton={false}
      >
        <div className="space-y-4">
          <TextField
            label="Sender"
            name="sender"
            value={formData.sender}
            onChange={(value) => setFormData({ ...formData, sender: value })}
            placeholder="Enter sender name"
            required
          />
          <TextField
            label="Recipient"
            name="recipient"
            value={formData.recipient}
            onChange={(value) => setFormData({ ...formData, recipient: value })}
            placeholder="Enter recipient name"
            required
          />
          <TextField
            label="Destination"
            name="destination"
            value={formData.destination}
            onChange={(value) => setFormData({ ...formData, destination: value })}
            placeholder="Enter destination address"
            required
          />
          <TextField
            label="Weight"
            name="weight"
            value={formData.weight}
            onChange={(value) => setFormData({ ...formData, weight: value })}
            placeholder="e.g., 2.5 kg"
            required
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddParcel} className="bg-[#AEFF8C] text-gray-900 hover:bg-[#9EEF7C]">
              Add Parcel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteParcel}
        title="Delete Parcel"
        description={`Are you sure you want to delete parcel ${selectedParcel?.trackingNumber}? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  )
}
