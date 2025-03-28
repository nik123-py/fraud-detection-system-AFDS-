import Link from "next/link"
import { ArrowRight, Bell, Database, Lock, Shield, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart } from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

export default function Home() {
  // Sample data for charts
  const fraudData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
  ]

  const detectionData = [
    { name: "Mon", detected: 120, prevented: 80 },
    { name: "Tue", detected: 140, prevented: 100 },
    { name: "Wed", detected: 170, prevented: 130 },
    { name: "Thu", detected: 90, prevented: 70 },
    { name: "Fri", detected: 180, prevented: 150 },
    { name: "Sat", detected: 60, prevented: 40 },
    { name: "Sun", detected: 80, prevented: 60 },
  ]

  const realTimeData = [
    { time: "00:00", value: 20 },
    { time: "04:00", value: 40 },
    { time: "08:00", value: 60 },
    { time: "12:00", value: 180 },
    { time: "16:00", value: 100 },
    { time: "20:00", value: 80 },
    { time: "24:00", value: 30 },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6 text-primary" />
            <span>FraudShield</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href="#statistics"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Statistics
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
          <div>
            <Link href="/dashboard">
              <Button>
                Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                  AI-Powered Fraud Detection System That Fights Back
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Protect your business with our advanced AI system that detects and prevents fraud in real-time, before
                  it happens.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Card className="w-full bg-card/50 backdrop-blur-sm border-muted">
                <CardHeader className="pb-0">
                  <CardTitle>Fraud Attempts Blocked Today</CardTitle>
                  <CardDescription>Real-time protection in action</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full">
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={realTimeData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="time" />
                          <YAxis />
                          <CartesianGrid strokeDasharray="3 3" />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorValue)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Chart>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Advanced Protection Features</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our system uses cutting-edge AI technology to protect your business from fraud.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
            <Card className="bg-card/50 backdrop-blur-sm border-muted">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Instant Detection</CardTitle>
                <CardDescription>Detect fraudulent activities within milliseconds of occurrence.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-muted">
              <CardHeader>
                <Database className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI-Powered Honeypots</CardTitle>
                <CardDescription>Trap and analyze fraudulent behavior to improve detection.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-muted">
              <CardHeader>
                <Bell className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Real-Time Alerts</CardTitle>
                <CardDescription>Get notified instantly when suspicious activity is detected.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-muted">
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Dynamic Visualization</CardTitle>
                <CardDescription>See fraud patterns and trends with interactive dashboards.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Statistics
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Fraud Prevention Metrics</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                See how our system is protecting businesses worldwide.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 mt-12">
            <Card className="bg-card/50 backdrop-blur-sm border-muted">
              <CardHeader>
                <CardTitle>Daily Fraud Attempts</CardTitle>
                <CardDescription>Number of fraud attempts detected and blocked daily</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={fraudData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Chart>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-muted">
              <CardHeader>
                <CardTitle>Detection vs Prevention</CardTitle>
                <CardDescription>Comparison of detected and prevented fraud attempts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={detectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="detected" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="prevented" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Chart>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-background to-background/80">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Secure Your Business?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get started with our AI-powered fraud detection system today.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                >
                  Access Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t bg-background py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2 font-bold">
            <Shield className="h-6 w-6 text-primary" />
            <span>FraudShield</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} FraudShield. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

