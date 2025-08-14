"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Package, Users, Truck, DollarSign } from "lucide-react"

export default function AnalyticsPage() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$124,567",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "Parcels Delivered",
      value: "3,247",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: Package,
    },
    {
      title: "Active Customers",
      value: "1,834",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: Users,
    },
    {
      title: "Fleet Utilization",
      value: "87%",
      change: "-2.1%",
      changeType: "negative" as const,
      icon: Truck,
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="Track performance metrics and business insights" />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <p className={`text-xs ${metric.changeType === "positive" ? "text-green-600" : "text-red-600"} mt-1`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Delivery Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <p className="text-sm text-green-700 mt-1">On-time Delivery Rate</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">4.8/5</div>
              <p className="text-sm text-blue-700 mt-1">Customer Satisfaction</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">2.3 hrs</div>
              <p className="text-sm text-purple-700 mt-1">Average Delivery Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
