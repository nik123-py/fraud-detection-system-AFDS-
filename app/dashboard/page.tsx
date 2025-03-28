"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  Filter,
  Home,
  MoreHorizontal,
  Search,
  Settings,
  Shield,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart } from "@/components/ui/chart"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data for charts
  const overviewData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 500 },
    { name: "Apr", value: 278 },
    { name: "May", value: 189 },
    { name: "Jun", value: 239 },
    { name: "Jul", value: 349 },
  ]

  const transactionData = [
    { time: "00:00", normal: 40, suspicious: 5 },
    { time: "04:00", normal: 30, suspicious: 8 },
    { time: "08:00", normal: 120, suspicious: 15 },
    { time: "12:00", normal: 180, suspicious: 20 },
    { time: "16:00", normal: 150, suspicious: 18 },
    { time: "20:00", normal: 80, suspicious: 10 },
    { time: "24:00", normal: 50, suspicious: 7 },
  ]

  const locationData = [
    { name: "North America", value: 400 },
    { name: "Europe", value: 300 },
    { name: "Asia", value: 200 },
    { name: "Africa", value: 100 },
    { name: "South America", value: 150 },
    { name: "Australia", value: 50 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

  const recentAlerts = [
    {
      id: 1,
      type: "Unusual Location",
      description: "Transaction attempted from a new location",
      time: "2 minutes ago",
      severity: "high",
      status: "blocked",
    },
    {
      id: 2,
      type: "Multiple Attempts",
      description: "Multiple failed authentication attempts",
      time: "15 minutes ago",
      severity: "medium",
      status: "flagged",
    },
    {
      id: 3,
      type: "Large Transaction",
      description: "Unusually large transaction amount",
      time: "1 hour ago",
      severity: "high",
      status: "blocked",
    },
    {
      id: 4,
      type: "Velocity Check",
      description: "Multiple transactions in short time period",
      time: "3 hours ago",
      severity: "medium",
      status: "flagged",
    },
    {
      id: 5,
      type: "Pattern Match",
      description: "Transaction matches known fraud pattern",
      time: "5 hours ago",
      severity: "high",
      status: "blocked",
    },
  ]

  const recentTransactions = [
    {
      id: "TX123456",
      user: "John Doe",
      amount: "$1,250.00",
      date: "Today, 2:30 PM",
      status: "Completed",
      risk: "Low",
    },
    {
      id: "TX123457",
      user: "Jane Smith",
      amount: "$450.00",
      date: "Today, 1:15 PM",
      status: "Completed",
      risk: "Low",
    },
    {
      id: "TX123458",
      user: "Robert Johnson",
      amount: "$2,750.00",
      date: "Today, 11:30 AM",
      status: "Flagged",
      risk: "Medium",
    },
    {
      id: "TX123459",
      user: "Emily Davis",
      amount: "$180.00",
      date: "Today, 10:45 AM",
      status: "Completed",
      risk: "Low",
    },
    {
      id: "TX123460",
      user: "Michael Wilson",
      amount: "$5,000.00",
      date: "Today, 9:20 AM",
      status: "Blocked",
      risk: "High",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Shield className="h-6 w-6 text-primary" />
              <span>FraudShield</span>
            </Link>
            <Link href="/" className="ml-4 flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-[200px] lg:w-[300px] pl-8" />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  Admin
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10 py-8">
        {/* Sidebar */}
        <aside className="fixed top-20 z-30 -ml-2 hidden h-[calc(100vh-5rem)] w-full shrink-0 md:sticky md:block">
          <nav className="flex h-full flex-col gap-2 p-2">
            <Button
              variant={activeTab === "overview" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <Home className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === "transactions" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("transactions")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Transactions
            </Button>
            <Button
              variant={activeTab === "alerts" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("alerts")}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Alerts
            </Button>
            <Button
              variant={activeTab === "analytics" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("analytics")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
            <Button
              variant={activeTab === "users" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
            <Button
              variant={activeTab === "settings" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex w-full flex-col gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>Last 7 days</span>
              </Button>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Download className="h-3.5 w-3.5" />
                <span>Export</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,345</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fraud Attempts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">243</div>
                <p className="text-xs text-muted-foreground">-4% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Money Saved</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$42,891</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+7% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Transaction Overview</CardTitle>
                <CardDescription>Normal vs. suspicious transactions over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={transactionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="colorSuspicious" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff7d7d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ff7d7d" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="normal"
                          stroke="#82ca9d"
                          fillOpacity={1}
                          fill="url(#colorNormal)"
                        />
                        <Area
                          type="monotone"
                          dataKey="suspicious"
                          stroke="#ff7d7d"
                          fillOpacity={1}
                          fill="url(#colorSuspicious)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Chart>
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Fraud by Location</CardTitle>
                <CardDescription>Geographic distribution of fraud attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={locationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {locationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Chart>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Recent Alerts</h2>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
              </Button>
            </div>
            <div className="mt-4 space-y-4">
              {recentAlerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`border-l-4 ${alert.severity === "high" ? "border-l-red-500" : "border-l-yellow-500"}`}
                >
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle
                          className={`h-5 w-5 ${alert.severity === "high" ? "text-red-500" : "text-yellow-500"}`}
                        />
                        <CardTitle className="text-base">{alert.type}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            alert.status === "blocked"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <CardDescription className="mt-1">{alert.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Recent Transactions</h2>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
            <div className="mt-4 rounded-md border">
              <div className="grid grid-cols-6 border-b px-4 py-3 font-medium">
                <div>Transaction ID</div>
                <div>User</div>
                <div>Amount</div>
                <div>Date</div>
                <div>Status</div>
                <div>Risk Level</div>
              </div>
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="grid grid-cols-6 items-center px-4 py-3 hover:bg-muted/50">
                  <div className="font-medium">{transaction.id}</div>
                  <div>{transaction.user}</div>
                  <div>{transaction.amount}</div>
                  <div>{transaction.date}</div>
                  <div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : transaction.status === "Flagged"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs ${
                        transaction.risk === "Low"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : transaction.risk === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {transaction.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-4">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} FraudShield. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Help Center
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Documentation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

