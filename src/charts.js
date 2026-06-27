import { getTrades } from "./helpers.js";

// Instâncias globais dos gráficos para podermos limpá-los/recriá-los
let regionChartInstance = null;
let behaviorChartInstance = null;

export function renderCharts() {
  const trades = getTrades();
  const regionCanvas = document.getElementById("chart-regiao");
  const behaviorCanvas = document.getElementById("chart-comportamento");

  // Se não houver operações cadastradas no localStorage, não faz nada
  if (trades.length === 0) return;

  // =======================================================
  // GRÁFICO 1: RESULTADO POR REGIÃO DE PREÇO (BARRA VERTICAL)
  // =======================================================
  if (regionCanvas) {
    const regionData = {};

    // Agrupa o saldo acumulado de pontos por região
    trades.forEach(trade => {
      const region = trade.region;
      if (!regionData[region]) {
        regionData[region] = 0;
      }
      regionData[region] += trade.result;
    });

    // Ordena as regiões de preço de forma crescente
    const sortedRegions = Object.keys(regionData).sort((a, b) => parseFloat(a) - parseFloat(b));
    const regionPoints = sortedRegions.map(region => regionData[region]);

    // Define cores dinâmicas: verde para ganho, vermelho/rosa para perda
    const chartColors = regionPoints.map(points => points >= 0 ? "#10b981" : "#f43f5e");

    if (regionChartInstance) {
      regionChartInstance.destroy();
    }

    regionChartInstance = new Chart(regionCanvas, {
      type: "bar",
      data: {
        labels: sortedRegions,
        datasets: [{
          label: "Saldo Acumulado (Pontos)",
          data: regionPoints,
          backgroundColor: chartColors,
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: { color: "#94a3b8" }
          },
          y: {
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: { color: "#94a3b8" }
          }
        }
      }
    });
  }

  // =======================================================
  // GRÁFICO 2: ASSERTIVIDADE POR COMPORTAMENTO DO AGRESSOR (BARRA HORIZONTAL)
  // =======================================================
  if (behaviorCanvas) {
    const behaviorData = {};

    // Mapeia o total de operações e as vitoriosas por tipo de agressor
    trades.forEach(trade => {
      const behavior = trade.agressor;
      if (!behavior) return;

      if (!behaviorData[behavior]) {
        behaviorData[behavior] = { total: 0, gains: 0 };
      }

      behaviorData[behavior].total += 1;
      if (trade.type === "gain") {
        behaviorData[behavior].gains += 1;
      }
    });

    const behaviors = Object.keys(behaviorData);

    // Calcula a porcentagem de acerto para cada comportamento cadastrado
    const winRates = behaviors.map(behavior => {
      const { total, gains } = behaviorData[behavior];
      return Math.round((gains / total) * 100);
    });

    if (behaviorChartInstance) {
      behaviorChartInstance.destroy();
    }

    behaviorChartInstance = new Chart(behaviorCanvas, {
      type: "bar",
      data: {
        labels: behaviors,
        datasets: [{
          label: "Taxa de Acerto (%)",
          data: winRates,
          backgroundColor: "#3b82f6", // Azul premium para visualização neutra/foco
          borderRadius: 6,
        }]
      },
      options: {
        indexAxis: "y", // Define o gráfico de barras horizontais
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: (context) => `Taxa de Acerto: ${context.raw}%`
            }
          }
        },
        scales: {
          x: {
            min: 0,
            max: 100,
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: {
              color: "#94a3b8",
              callback: (value) => `${value}%` // Adiciona o símbolo de porcentagem
            }
          },
          y: {
            grid: { display: false },
            ticks: { color: "#94a3b8" }
          }
        }
      }
    });
  }
}
