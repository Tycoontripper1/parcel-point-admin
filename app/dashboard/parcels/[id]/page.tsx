"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit } from "lucide-react"

// Mock data for the parcel detail view
const mockParcelDetail = {
  id: "1",
  trackingNumber: "PP647690",
  agent: {
    name: "Chinelo Okoro",
    company: "Chinelomarcus Logistics",
    phone: "08011022534",
    address: "456, Onitsha, Anambra State, Central Market Plaza",
  },
  parcel: {
    date: "10-01-2024 - 9:18 PM",
    type: "Clothing",
    weight: "₦50,000.00",
    value: "₦50,000.00",
    chargesPaidBy: "Sender",
    description:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  },
  images: [
    "/brown-package-box.png",
    "/white-package-envelope.png",
    "/black-package-box.png",
    "/cardboard-shipping-box.png",
  ],
  sender: {
    name: "Chinelo Okoro",
    email: "chinelomarcus@gmail.com",
    phone: "08011022534",
    address: "No. 4, Garuba street, Ikotodu, Lagos.",
  },
  receiver: {
    name: "Mary Adebola",
    email: "NA",
    phone: "08011022534",
    address: "No. 4, Tejuoso Estate, Ijebutedo, Ilodan.",
  },
  driver: {
    name: "Chinedu Anselm",
    phone: "08011022534",
    id: "PP647690",
  },
}

export default function ParcelDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-semibold text-gray-900">Parcel Information</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Agent Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Agent Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Agent Name</label>
                <p className="text-gray-900">{mockParcelDetail.agent.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <p className="text-gray-900">{mockParcelDetail.agent.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="text-gray-900">{mockParcelDetail.agent.address}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Business Name</label>
                <p className="text-gray-900">{mockParcelDetail.agent.company}</p>
              </div>
            </CardContent>
          </Card>

          {/* Parcel Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Parcel Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <p className="text-gray-900">{mockParcelDetail.parcel.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Parcel Type</label>
                  <p className="text-gray-900">{mockParcelDetail.parcel.type}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Parcel Weight</label>
                  <p className="text-gray-900">{mockParcelDetail.parcel.weight}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Parcel Value</label>
                  <p className="text-gray-900">{mockParcelDetail.parcel.value}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Charges Paid by</label>
                <p className="text-gray-900">{mockParcelDetail.parcel.chargesPaidBy}</p>
              </div>
            </CardContent>
          </Card>

          {/* Parcel Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Parcel Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed">{mockParcelDetail.parcel.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {mockParcelDetail.images.map((image, index) => (
                  <div key={index} className="aspect-square">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Parcel image ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Sender's Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Sender&apos;s Information</CardTitle>
              <Button variant="ghost" size="sm" className="text-[#AEFF8C] hover:text-[#9EEF7C]">
                <Edit className="h-4 w-4 mr-1" />
                Edit Information
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-900">{mockParcelDetail.sender.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email Address</label>
                <p className="text-gray-900">{mockParcelDetail.sender.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <p className="text-gray-900">{mockParcelDetail.sender.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="text-gray-900">{mockParcelDetail.sender.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Receiver's Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Receiver&apos;s Information</CardTitle>
              <Button variant="ghost" size="sm" className="text-[#AEFF8C] hover:text-[#9EEF7C]">
                <Edit className="h-4 w-4 mr-1" />
                Edit Information
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-gray-900">{mockParcelDetail.receiver.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Email Address</label>
                <p className="text-gray-900">{mockParcelDetail.receiver.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <p className="text-gray-900">{mockParcelDetail.receiver.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Address</label>
                <p className="text-gray-900">{mockParcelDetail.receiver.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Driver's Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Driver&apos;s Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Driver Name</label>
                <p className="text-gray-900">{mockParcelDetail.driver.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <p className="text-gray-900">{mockParcelDetail.driver.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Driver ID</label>
                <p className="text-gray-900">{mockParcelDetail.driver.id}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
