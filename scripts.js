import { Chart } from "@/components/ui/chart"
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
  })
}

// Set current year in footer
const currentYearElement = document.getElementById("currentYear")
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear()
}

// Charts
document.addEventListener("DOMContentLoaded", () => {
  // Clear any existing Chart instances before creating new ones
  if (window.chartInstances) {
    window.chartInstances.forEach((chart) => {
      if (chart) chart.destroy()
    })
  }

  window.chartInstances = []

  // Real-time Chart
  const realTimeChartEl = document.getElementById("realTimeChart")
  if (realTimeChartEl) {
    const realTimeData = [
      { time: "00:00", value: 20 },
      { time: "04:00", value: 40 },
      { time: "08:00", value: 60 },
      { time: "12:00", value: 180 },
      { time: "16:00", value: 100 },
      { time: "20:00", value: 80 },
      { time: "24:00", value: 30 },
    ]

    const chart = new Chart(realTimeChartEl, {
      type: "line",
      data: {
        labels: realTimeData.map((row) => row.time),
        datasets: [
          {
            label: "Fraud Attempts Blocked",
            data: realTimeData.map((row) => row.value),
            fill: true,
            backgroundColor: "rgba(138, 43, 226, 0.2)",
            borderColor: "rgba(138, 43, 226, 1)",
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

    window.chartInstances.push(chart)
  }

  // Fraud Attempts Chart
  const fraudAttemptsChartEl = document.getElementById("fraudAttemptsChart")
  if (fraudAttemptsChartEl) {
    const fraudData = [
      { name: "Jan", value: 4000 },
      { name: "Feb", value: 3000 },
      { name: "Mar", value: 5000 },
      { name: "Apr", value: 2780 },
      { name: "May", value: 1890 },
      { name: "Jun", value: 2390 },
      { name: "Jul", value: 3490 },
    ]

    const chart = new Chart(fraudAttemptsChartEl, {
      type: "bar",
      data: {
        labels: fraudData.map((row) => row.name),
        datasets: [
          {
            label: "Fraud Attempts",
            data: fraudData.map((row) => row.value),
            backgroundColor: "rgba(138, 43, 226, 0.7)",
            borderColor: "rgba(138, 43, 226, 1)",
            borderWidth: 1,
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

    window.chartInstances.push(chart)
  }

  // Detection Chart
  const detectionChartEl = document.getElementById("detectionChart")
  if (detectionChartEl) {
    const detectionData = [
      { name: "Mon", detected: 120, prevented: 80 },
      { name: "Tue", detected: 140, prevented: 100 },
      { name: "Wed", detected: 170, prevented: 130 },
      { name: "Thu", detected: 90, prevented: 70 },
      { name: "Fri", detected: 180, prevented: 150 },
      { name: "Sat", detected: 60, prevented: 40 },
      { name: "Sun", detected: 80, prevented: 60 },
    ]

    const chart = new Chart(detectionChartEl, {
      type: "line",
      data: {
        labels: detectionData.map((row) => row.name),
        datasets: [
          {
            label: "Detected",
            data: detectionData.map((row) => row.detected),
            borderColor: "rgba(138, 43, 226, 1)",
            backgroundColor: "rgba(138, 43, 226, 0.1)",
            tension: 0.4,
          },
          {
            label: "Prevented",
            data: detectionData.map((row) => row.prevented),
            borderColor: "rgba(130, 202, 157, 1)",
            backgroundColor: "rgba(130, 202, 157, 0.1)",
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

    window.chartInstances.push(chart)
  }
})

