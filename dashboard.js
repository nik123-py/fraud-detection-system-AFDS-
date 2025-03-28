import { Chart } from "@/components/ui/chart"
// Mobile Menu Toggle
const dashboardMenuBtn = document.getElementById("dashboardMenuBtn")
const dashboardMobileMenu = document.getElementById("dashboardMobileMenu")

if (dashboardMenuBtn && dashboardMobileMenu) {
  dashboardMenuBtn.addEventListener("click", () => {
    dashboardMobileMenu.classList.toggle("active")
  })
}

// Set current year in footer
const dashboardCurrentYearElement = document.getElementById("dashboardCurrentYear")
if (dashboardCurrentYearElement) {
  dashboardCurrentYearElement.textContent = new Date().getFullYear()
}

// Sidebar Navigation
const sidebarButtons = document.querySelectorAll(".sidebar-btn")
sidebarButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    sidebarButtons.forEach((btn) => btn.classList.remove("active"))
    // Add active class to clicked button
    button.classList.add("active")
  })
})

// Add this at the beginning of the file to ensure no duplicate Chart instances
document.addEventListener("DOMContentLoaded", () => {
  // Clear any existing Chart instances before creating new ones
  if (window.dashboardChartInstances) {
    window.dashboardChartInstances.forEach((chart) => {
      if (chart) chart.destroy()
    })
  }

  window.dashboardChartInstances = []

  // Transaction Overview Chart
  const transactionOverviewChartEl = document.getElementById("transactionOverviewChart")
  if (transactionOverviewChartEl) {
    const transactionData = [
      { time: "00:00", normal: 40, suspicious: 5 },
      { time: "04:00", normal: 30, suspicious: 8 },
      { time: "08:00", normal: 120, suspicious: 15 },
      { time: "12:00", normal: 180, suspicious: 20 },
      { time: "16:00", normal: 150, suspicious: 18 },
      { time: "20:00", normal: 80, suspicious: 10 },
      { time: "24:00", normal: 50, suspicious: 7 },
    ]

    const chart = new Chart(transactionOverviewChartEl, {
      type: "line",
      data: {
        labels: transactionData.map((row) => row.time),
        datasets: [
          {
            label: "Normal Transactions",
            data: transactionData.map((row) => row.normal),
            borderColor: "rgba(130, 202, 157, 1)",
            backgroundColor: "rgba(130, 202, 157, 0.1)",
            fill: true,
            tension: 0.4,
          },
          {
            label: "Suspicious Transactions",
            data: transactionData.map((row) => row.suspicious),
            borderColor: "rgba(255, 125, 125, 1)",
            backgroundColor: "rgba(255, 125, 125, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#f8f9fa",
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#f8f9fa",
            },
          },
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#f8f9fa",
            },
          },
        },
      },
    })

    window.dashboardChartInstances.push(chart)
  }

  // Location Chart
  const locationChartEl = document.getElementById("locationChart")
  if (locationChartEl) {
    const locationData = [
      { name: "North America", value: 400 },
      { name: "Europe", value: 300 },
      { name: "Asia", value: 200 },
      { name: "Africa", value: 100 },
      { name: "South America", value: 150 },
      { name: "Australia", value: 50 },
    ]

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

    const chart = new Chart(locationChartEl, {
      type: "pie",
      data: {
        labels: locationData.map((row) => row.name),
        datasets: [
          {
            data: locationData.map((row) => row.value),
            backgroundColor: COLORS,
            borderColor: "rgba(26, 28, 37, 0.8)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "#f8f9fa",
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw || 0
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = Math.round((value / total) * 100)
                return `${label}: ${percentage}% (${value})`
              },
            },
          },
        },
      },
    })

    window.dashboardChartInstances.push(chart)
  }
})

