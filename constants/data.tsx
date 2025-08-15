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
export interface Agent {
  id: string;
  name: string;
  agentId: string;
  phoneNumber: string;
  emailAddress: string;
  dateJoined: string;
  status: "Active" | "Inactive";
  parcelsProcessed: number;
}

export const mockAgents: Agent[] = [
  {
    id: "1",
    name: "Chinelo Marcus",
    agentId: "AGT-001",
    phoneNumber: "08011022534",
    emailAddress: "chinelomarcus@gmail.com",
    dateJoined: "15-01-2025",
    status: "Active",
    parcelsProcessed: 120,
  },
  {
    id: "2",
    name: "John Doe",
    agentId: "AGT-002",
    phoneNumber: "08022334455",
    emailAddress: "john.doe@example.com",
    dateJoined: "12-01-2025",
    status: "Inactive",
    parcelsProcessed: 45,
  },
  {
    id: "3",
    name: "Grace Akintola",
    agentId: "AGT-003",
    phoneNumber: "08033445566",
    emailAddress: "grace.akintola@example.com",
    dateJoined: "10-01-2025",
    status: "Active",
    parcelsProcessed: 200,
  },
  {
    id: "4",
    name: "Michael Johnson",
    agentId: "AGT-004",
    phoneNumber: "08044556677",
    emailAddress: "michael.j@example.com",
    dateJoined: "09-01-2025",
    status: "Inactive",
    parcelsProcessed: 30,
  },
  {
    id: "5",
    name: "Fatima Bello",
    agentId: "AGT-005",
    phoneNumber: "08055667788",
    emailAddress: "fatima.bello@example.com",
    dateJoined: "08-01-2025",
    status: "Active",
    parcelsProcessed: 150,
  },
  {
    id: "6",
    name: "Samuel Okafor",
    agentId: "AGT-006",
    phoneNumber: "08066778899",
    emailAddress: "samuel.okafor@example.com",
    dateJoined: "07-01-2025",
    status: "Active",
    parcelsProcessed: 175,
  },
  {
    id: "7",
    name: "Blessing Eze",
    agentId: "AGT-007",
    phoneNumber: "08077889900",
    emailAddress: "blessing.eze@example.com",
    dateJoined: "06-01-2025",
    status: "Inactive",
    parcelsProcessed: 50,
  },
  {
    id: "8",
    name: "Peter Obi",
    agentId: "AGT-008",
    phoneNumber: "08088990011",
    emailAddress: "peter.obi@example.com",
    dateJoined: "05-01-2025",
    status: "Active",
    parcelsProcessed: 210,
  },
  {
    id: "9",
    name: "Esther Adeniyi",
    agentId: "AGT-009",
    phoneNumber: "08099001122",
    emailAddress: "esther.adeniyi@example.com",
    dateJoined: "04-01-2025",
    status: "Inactive",
    parcelsProcessed: 65,
  },
  {
    id: "10",
    name: "James Uche",
    agentId: "AGT-010",
    phoneNumber: "08100112233",
    emailAddress: "james.uche@example.com",
    dateJoined: "03-01-2025",
    status: "Active",
    parcelsProcessed: 300,
  },
  {
    id: "11",
    name: "Mary Chukwu",
    agentId: "AGT-011",
    phoneNumber: "08111223344",
    emailAddress: "mary.chukwu@example.com",
    dateJoined: "02-01-2025",
    status: "Active",
    parcelsProcessed: 95,
  },
  {
    id: "12",
    name: "Tunde Balogun",
    agentId: "AGT-012",
    phoneNumber: "08122334455",
    emailAddress: "tunde.balogun@example.com",
    dateJoined: "01-01-2025",
    status: "Inactive",
    parcelsProcessed: 40,
  },
  {
    id: "13",
    name: "Zainab Musa",
    agentId: "AGT-013",
    phoneNumber: "08133445566",
    emailAddress: "zainab.musa@example.com",
    dateJoined: "31-12-2024",
    status: "Active",
    parcelsProcessed: 160,
  },
  {
    id: "14",
    name: "David Adeyemi",
    agentId: "AGT-014",
    phoneNumber: "08144556677",
    emailAddress: "david.adeyemi@example.com",
    dateJoined: "30-12-2024",
    status: "Inactive",
    parcelsProcessed: 25,
  },
  {
    id: "15",
    name: "Patience Onyekachi",
    agentId: "AGT-015",
    phoneNumber: "08155667788",
    emailAddress: "patience.onyekachi@example.com",
    dateJoined: "29-12-2024",
    status: "Active",
    parcelsProcessed: 185,
  },
];


type Status = "Resolved" | "Unresolved" | "Escalated";

type Priority = "Low" | "Medium" | "High";

export interface Dispute {
  id: string;
  subject: string;
  user: string;
  userType: string;
  priority: Priority;
  date: string;
  status: Status;
  category: string;
  feedback: string;
}
export const disputesData: Dispute[] = [
  {
    id: "DIS-74989",
    subject: "Lorem ipsum dolor sit amet",
    user: "Chinedo Marcus",
    userType: "Agent",
    priority: "High",
    date: "15-01-2025",
    status: "Unresolved",
    category: "Parcel",
    feedback:
      "Lorem ipsum dolor sit amet consectetur. Amet arcu amet malesuada tincidunt praesent interdum diam. Felis netus purus vel egestas.",
  },
  {
    id: "DIS-74988",
    subject: "Lorem ipsum dolor sit amet",
    user: "Adewale Jinadi",
    userType: "Agent",
    priority: "Low",
    date: "14-01-2025",
    status: "Resolved",
    category: "Payment",
    feedback: "Issue resolved successfully.",
  },
  {
    id: "DIS-74987",
    subject: "Lorem ipsum dolor sit amet",
    user: "Mary Kolawole",
    userType: "Driver",
    priority: "Medium",
    date: "13-01-2025",
    status: "Unresolved",
    category: "Delivery",
    feedback: "Awaiting customer response.",
  },
  {
    id: "DIS-74986",
    subject: "Lorem ipsum dolor sit amet",
    user: "Ola John",
    userType: "Customer",
    priority: "High",
    date: "12-01-2025",
    status: "Escalated",
    category: "Payment",
    feedback: "Escalated to management team.",
  },
  {
    id: "DIS-74985",
    subject: "Lorem ipsum dolor sit amet",
    user: "Mary Kolawole",
    userType: "Driver",
    priority: "Low",
    date: "11-01-2025",
    status: "Resolved",
    category: "Delivery",
    feedback: "Successfully delivered to customer.",
  },
];
export const disputeData: Dispute[] = [
  {
    id: "DIS-74989",
    subject: "Lorem ipsum dolor sit amet",
    user: "Chinedo Marcus",
    userType: "Agent",
    priority: "High",
    date: "15-01-2025",
    status: "Unresolved",
    category: "Parcel",
    feedback:
      "Lorem ipsum dolor sit amet consectetur. Amet arcu amet malesuada tincidunt praesent interdum diam. Felis netus purus vel egestas.",
  },
  {
    id: "DIS-74988",
    subject: "Lorem ipsum dolor sit amet",
    user: "Adewale Jinadi",
    userType: "Agent",
    priority: "Low",
    date: "14-01-2025",
    status: "Resolved",
    category: "Payment",
    feedback: "Issue resolved successfully.",
  },
  {
    id: "DIS-74987",
    subject: "Lorem ipsum dolor sit amet",
    user: "Mary Kolawole",
    userType: "Driver",
    priority: "Medium",
    date: "13-01-2025",
    status: "Unresolved",
    category: "Delivery",
    feedback: "Awaiting customer response.",
  },
  {
    id: "DIS-74986",
    subject: "Lorem ipsum dolor sit amet",
    user: "Ola John",
    userType: "Customer",
    priority: "High",
    date: "12-01-2025",
    status: "Escalated",
    category: "Payment",
    feedback: "Escalated to management team.",
  },
  {
    id: "DIS-74985",
    subject: "Lorem ipsum dolor sit amet",
    user: "Mary Kolawole",
    userType: "Driver",
    priority: "Low",
    date: "11-01-2025",
    status: "Resolved",
    category: "Delivery",
    feedback: "Successfully delivered to customer.",
  },
];
