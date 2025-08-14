"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import React from "react"
import { DateRange } from "react-day-picker"
import { StatCard } from "@/components/dashboard/startCard"

const stats = [
  {
    title: "Total Revenue",
    value: "₦2,500,000.00",
    change: "+5% vs last month",
    changeType: "positive" as const,
  },
  {
    title: "Total No. of Agents",
    value: "2,500",
    change: "+8% vs last month",
    changeType: "positive" as const,
  },
  {
    title: "Total No. of Drivers",
    value: "3,500",
    change: "+3% vs last month",
    changeType: "positive" as const,
  },
  {
    title: "Total Parcels",
    value: "5,000",
    change: "+12% vs last month",
    changeType: "positive" as const,
  },
]

const revenueData = [
  { month: "Jan", revenue: 2000000 },
  { month: "Feb", revenue: 2200000 },
  { month: "Mar", revenue: 1800000 },
  { month: "Apr", revenue: 2400000 },
  { month: "May", revenue: 1600000 },
  { month: "Jun", revenue: 2800000 },
  { month: "Jul", revenue: 2600000 },
  { month: "Aug", revenue: 2200000 },
  { month: "Sep", revenue: 2400000 },
  { month: "Oct", revenue: 2800000 },
  { month: "Nov", revenue: 3000000 },
  { month: "Dec", revenue: 2500000 },
]

const topAgents = [
  { agent: "Chinelo Marcus", region: "Lagos", parcels: 1000, revenue: "5,000,000.00" },
  { agent: "Adaora Kelechi", region: "Abuja", parcels: 800, revenue: "4,000,000.00" },
  { agent: "Munneni Kelechi", region: "Ibadan", parcels: 700, revenue: "3,000,000.00" },
  { agent: "Chinelo Hameed", region: "Kano", parcels: 650, revenue: "2,000,000.00" },
  { agent: "Osun Chukwu", region: "Imo", parcels: 600, revenue: "1,500,000.00" },
]

const topDrivers = [
  { driver: "David Nnachi", region: "Lagos", parcelsHandled: 100, totalPaid: "500,000.00" },
  { driver: "Okwuchukwu", region: "Abuja", parcelsHandled: 80, totalPaid: "400,000.00" },
  { driver: "Obinna Fidelis", region: "Ibadan", parcelsHandled: 70, totalPaid: "300,000.00" },
  { driver: "Kelechi Sambo", region: "Kano", parcelsHandled: 60, totalPaid: "200,000.00" },
  { driver: "Emeka Johnson", region: "Imo", parcelsHandled: 50, totalPaid: "100,000.00" },
]

export default function DashboardPage() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })
  const [preset, setPreset] = React.useState("this-month")
  const [open, setOpen] = React.useState(false)

  const handlePresetChange = (value: string) => {
    setPreset(value)
    const today = new Date()
    
    switch (value) {
      case "this-month":
        setDate({
          from: new Date(today.getFullYear(), today.getMonth(), 1),
          to: today,
        })
        break
      case "last-month":
        const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
        const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
        setDate({
          from: firstDayLastMonth,
          to: lastDayLastMonth,
        })
        break
      case "this-year":
        setDate({
          from: new Date(today.getFullYear(), 0, 1),
          to: today,
        })
        break
      default:
        break
    }
  }

  const handleApply = () => {
    setOpen(false)
    // Here you would typically trigger any data fetching or updates based on the selected date
    console.log("Date range selected:", date)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Select date range:</span>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className="w-[280px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="flex">
                <div className="p-2 border-r">
                  <Select value={preset} onValueChange={handlePresetChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select preset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="this-month">This Month</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="this-year">This Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  defaultMonth={date?.from}
                />
              </div>
              <div className="flex justify-end p-2 border-t">
                <Button onClick={handleApply} size="sm">
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeClassName={
            stat.changeType === "positive" 
              ? "text-green-500" 
              : "text-red-500"
          }
        />
      ))}
    </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Revenue</CardTitle>
              <Select defaultValue="this-month">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-gray-600">Earnings over time</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#666" }} />
                  <YAxis hide />
                  <Line type="monotone" dataKey="revenue" stroke="#AEFF8C" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Agents</CardTitle>
              <Select defaultValue="revenue">
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="parcels">Parcels</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select defaultValue="all-time">
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-32 h-32 mb-4">
              <CircularProgressbar
                value={70}
                text="70%"
                styles={buildStyles({
                  textSize: "24px",
                  pathColor: "#3B82F6",
                  textColor: "#1F2937",
                  trailColor: "#E5E7EB",
                  strokeLinecap: "round",
                })}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">Active Agents</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Performing Agents by Region</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#FAFAFA] bg-[#FAFAFA]">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Agents</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">State/Region</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Parcels</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topAgents.map((agent, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-2 text-sm text-gray-900">{agent.agent}</td>
                      <td className="py-3 px-2 text-sm text-gray-600">{agent.region}</td>
                      <td className="py-3 px-2 text-sm text-gray-900">{agent.parcels}</td>
                      <td className="py-3 px-2 text-sm text-gray-900">{agent.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top Performing Drivers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-[#FAFAFA]">
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Driver</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">State/Region</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Parcels Handled</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Total Paid</th>
                  </tr>
                </thead>
                <tbody>
                  {topDrivers.map((driver, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-2 text-sm text-gray-900">{driver.driver}</td>
                      <td className="py-3 px-2 text-sm text-gray-600">{driver.region}</td>
                      <td className="py-3 px-2 text-sm text-gray-900">{driver.parcelsHandled}</td>
                      <td className="py-3 px-2 text-sm text-gray-900">{driver.totalPaid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}