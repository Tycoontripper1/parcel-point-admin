"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TextField, SelectField } from "@/components/ui/form-field"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [companySettings, setCompanySettings] = useState({
    companyName: "ParcelPoint",
    email: "admin@parcelpoint.com",
    phone: "+1 (555) 000-0000",
    address: "123 Business Ave, City, State 12345",
    timezone: "America/New_York",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
  })

  const [deliverySettings, setDeliverySettings] = useState({
    defaultDeliveryTime: "2-3 business days",
    maxDeliveryRadius: "50",
    deliveryFee: "5.99",
  })

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Manage system settings and preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <TextField
              label="Company Name"
              name="companyName"
              value={companySettings.companyName}
              onChange={(value) => setCompanySettings({ ...companySettings, companyName: value })}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={companySettings.email}
              onChange={(value) => setCompanySettings({ ...companySettings, email: value })}
            />
            <TextField
              label="Phone"
              name="phone"
              value={companySettings.phone}
              onChange={(value) => setCompanySettings({ ...companySettings, phone: value })}
            />
            <TextField
              label="Address"
              name="address"
              value={companySettings.address}
              onChange={(value) => setCompanySettings({ ...companySettings, address: value })}
            />
            <SelectField
              label="Timezone"
              name="timezone"
              value={companySettings.timezone}
              onChange={(value) => setCompanySettings({ ...companySettings, timezone: value })}
              options={[
                { value: "America/New_York", label: "Eastern Time" },
                { value: "America/Chicago", label: "Central Time" },
                { value: "America/Denver", label: "Mountain Time" },
                { value: "America/Los_Angeles", label: "Pacific Time" },
              ]}
            />
            <Button className="bg-[#AEFF8C] text-gray-900 hover:bg-[#9EEF7C]">Save Changes</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={notifications.emailNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <Switch
                id="sms-notifications"
                checked={notifications.smsNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <Switch
                id="push-notifications"
                checked={notifications.pushNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <Label htmlFor="weekly-reports">Weekly Reports</Label>
              <Switch
                id="weekly-reports"
                checked={notifications.weeklyReports}
                onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
              />
            </div>
            <Button className="bg-[#AEFF8C] text-gray-900 hover:bg-[#9EEF7C]">Save Preferences</Button>
          </CardContent>
        </Card>

        {/* Delivery Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Delivery Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SelectField
                label="Default Delivery Time"
                name="deliveryTime"
                value={deliverySettings.defaultDeliveryTime}
                onChange={(value) => setDeliverySettings({ ...deliverySettings, defaultDeliveryTime: value })}
                options={[
                  { value: "1 business day", label: "1 Business Day" },
                  { value: "2-3 business days", label: "2-3 Business Days" },
                  { value: "3-5 business days", label: "3-5 Business Days" },
                  { value: "1 week", label: "1 Week" },
                ]}
              />
              <TextField
                label="Max Delivery Radius (km)"
                name="radius"
                value={deliverySettings.maxDeliveryRadius}
                onChange={(value) => setDeliverySettings({ ...deliverySettings, maxDeliveryRadius: value })}
              />
              <TextField
                label="Base Delivery Fee ($)"
                name="fee"
                value={deliverySettings.deliveryFee}
                onChange={(value) => setDeliverySettings({ ...deliverySettings, deliveryFee: value })}
              />
            </div>
            <div className="mt-6">
              <Button className="bg-[#AEFF8C] text-gray-900 hover:bg-[#9EEF7C]">Update Settings</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
