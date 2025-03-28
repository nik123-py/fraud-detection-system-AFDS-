import { Chart } from "@/components/ui/chart"
// Mobile Menu Toggle
const featureMenuBtn = document.getElementById("featureMenuBtn")
const featureMobileMenu = document.getElementById("featureMobileMenu")

if (featureMenuBtn && featureMobileMenu) {
  featureMenuBtn.addEventListener("click", () => {
    featureMobileMenu.classList.toggle("active")
  })
}

// Set current year in footer
const featureCurrentYearElement = document.getElementById("featureCurrentYear")
if (featureCurrentYearElement) {
  featureCurrentYearElement.textContent = new Date().getFullYear()
}

// Charts for Feature Pages
document.addEventListener("DOMContentLoaded", () => {
  // Clear any existing Chart instances before creating new ones
  if (window.featureChartInstances) {
    window.featureChartInstances.forEach((chart) => {
      if (chart) chart.destroy()
    })
  }

  window.featureChartInstances = []

  // Detection Speed Chart (Instant Detection page)
  const detectionSpeedChartEl = document.getElementById("detectionSpeedChart")
  if (detectionSpeedChartEl) {
    const speedData = [
      { name: "Traditional", value: 2500 },
      { name: "Rule-Based", value: 1200 },
      { name: "ML-Based", value: 500 },
      { name: "FraudShield", value: 50 },
    ]

    const chart = new Chart(detectionSpeedChartEl, {
      type: "bar",
      data: {
        labels: speedData.map((row) => row.name),
        datasets: [
          {
            label: "Detection Time (ms)",
            data: speedData.map((row) => row.value),
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(255, 159, 64, 0.7)",
              "rgba(255, 205, 86, 0.7)",
              "rgba(138, 43, 226, 0.7)",
            ],
            borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(138, 43, 226)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#f8f9fa",
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.raw} ms`,
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#f8f9fa",
            },
          },
          y: {
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

    window.featureChartInstances.push(chart)
  }

  // Honeypot Chart (AI-Powered Honeypots page)
  const honeypotChartEl = document.getElementById("honeypotChart")
  if (honeypotChartEl) {
    const honeypotData = [
      { month: "Jan", traditional: 30, ai: 65 },
      { month: "Feb", traditional: 35, ai: 70 },
      { month: "Mar", traditional: 40, ai: 75 },
      { month: "Apr", traditional: 45, ai: 80 },
      { month: "May", traditional: 50, ai: 85 },
      { month: "Jun", traditional: 55, ai: 90 },
    ]

    const chart = new Chart(honeypotChartEl, {
      type: "line",
      data: {
        labels: honeypotData.map((row) => row.month),
        datasets: [
          {
            label: "Traditional Honeypots",
            data: honeypotData.map((row) => row.traditional),
            borderColor: "rgba(255, 159, 64, 1)",
            backgroundColor: "rgba(255, 159, 64, 0.1)",
            tension: 0.4,
          },
          {
            label: "AI-Powered Honeypots",
            data: honeypotData.map((row) => row.ai),
            borderColor: "rgba(138, 43, 226, 1)",
            backgroundColor: "rgba(138, 43, 226, 0.1)",
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
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.raw}% effectiveness`,
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
              callback: (value) => value + "%",
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
    window.featureChartInstances.push(chart)
  }

  // Alert Response Chart (Real-Time Alerts page)
  const alertResponseChartEl = document.getElementById("alertResponseChart")
  if (alertResponseChartEl) {
    const responseData = [
      { category: "Financial Loss", before: 85, after: 15 },
      { category: "Account Takeover", before: 70, after: 20 },
      { category: "Identity Theft", before: 75, after: 25 },
      { category: "Payment Fraud", before: 80, after: 30 },
    ]

    const chart = new Chart(alertResponseChartEl, {
      type: "bar",
      data: {
        labels: responseData.map((row) => row.category),
        datasets: [
          {
            label: "Before Real-Time Alerts",
            data: responseData.map((row) => row.before),
            backgroundColor: "rgba(255, 99, 132, 0.7)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1,
          },
          {
            label: "With Real-Time Alerts",
            data: responseData.map((row) => row.after),
            backgroundColor: "rgba(138, 43, 226, 0.7)",
            borderColor: "rgb(138, 43, 226)",
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
          tooltip: {
            callbacks: {
              label: (context) => `${context.dataset.label}: ${context.raw}%`,
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
              callback: (value) => value + "%",
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
    window.featureChartInstances.push(chart)
  }

  // Visualization Chart (Dynamic Visualization page)
  const visualizationChartEl = document.getElementById("visualizationChart")
  if (visualizationChartEl) {
    const visualizationData = [
      { method: "Raw Data Analysis", time: 45 },
      { method: "Spreadsheet Review", time: 30 },
      { method: "Basic Charts", time: 20 },
      { method: "Dynamic Visualization", time: 8 },
    ]

    const chart = new Chart(visualizationChartEl, {
      type: "bar",
      data: {
        labels: visualizationData.map((row) => row.method),
        datasets: [
          {
            label: "Decision Time (minutes)",
            data: visualizationData.map((row) => row.time),
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(255, 159, 64, 0.7)",
              "rgba(255, 205, 86, 0.7)",
              "rgba(138, 43, 226, 0.7)",
            ],
            borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(138, 43, 226)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#f8f9fa",
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.raw} minutes`,
            },
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            ticks: {
              color: "#f8f9fa",
            },
          },
          y: {
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
    window.featureChartInstances.push(chart)
  }
})

