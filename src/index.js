import { renderCharts } from "./charts.js"; // Correção: adicionado .js no final
import { getTrades, saveTrades } from "./helpers.js";
import { renderHistory } from "./renderHistory.js";
import "./import-export.js";
import "./contact.js";
// ==========================================
// CONFIGURAÇÕES GLOBAIS E SELETORES
// ==========================================


const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll(".tab-pane");
const logListContainer = document.getElementById("log-list");
const formRegister = document.getElementById("form-registro");

// ==========================================
// 1. NAVEGAÇÃO DE ABAS
// ==========================================
tabButtons.forEach(button => {
  button.addEventListener("click", () => {
    tabButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    const targetTab = button.dataset.tab;
    tabPanes.forEach(pane => pane.classList.remove("active"));

    const activePane = document.getElementById(`pane-${targetTab}`);
    if (activePane) {
      activePane.classList.add("active");
    }
  });
});

// ==========================================
// 2. LÓGICA DOS SELETORES DE TAGS (FORMULÁRIO)
// ==========================================
function configSelectorTags(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const tagButton = container.querySelectorAll(".tag-btn");

  tagButton.forEach(button => {
    button.addEventListener("click", () => {
      const isSelected = button.classList.contains("selected");
      tagButton.forEach(btn => btn.classList.remove("selected"));
      if (!isSelected) {
        button.classList.add("selected");
      }
    });
  });
}

configSelectorTags("agressor-selector");
configSelectorTags("defesa-selector");
configSelectorTags("gatilho-selector");


// ==========================================
// 5. EXCLUSÃO DE REGISTRO (DELEGAÇÃO DE EVENTO)
// ==========================================
logListContainer.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-btn");
  if (!deleteButton) return;

  const tradeId = deleteButton.dataset.id;

  if (confirm("Você tem certeza que deseja excluir este registro de operação?")) {
    let currentTrades = getTrades();
    currentTrades = currentTrades.filter(trade => trade.id !== tradeId);
    saveTrades(currentTrades);
    renderHistory();
    renderCharts(); // Atualiza os gráficos após deletar!
  }
});

// ==========================================
// 3. CAPTURA DO FORMULÁRIO E ENVIO DE DADOS
// ==========================================
formRegister.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedAgressor = document.querySelector("#agressor-selector .tag-btn.selected");
  const selectedDefense = document.querySelector("#defesa-selector .tag-btn.selected");
  const selectedTrigger = document.querySelector("#gatilho-selector .tag-btn.selected");

  if (!selectedAgressor || !selectedDefense || !selectedTrigger) {
    alert("Por favor, selecione as três tags de fluxo (Agressor, Defesa e Gatilho) antes de salvar!");
    return;
  }

  const newTrade = {
    id: Date.now().toString(),
    date: document.getElementById("input-data").value,
    time: document.getElementById("input-hora").value,
    region: parseFloat(document.getElementById("input-regiao").value),
    agressor: selectedAgressor.dataset.value,
    defense: selectedDefense.dataset.value,
    trigger: selectedTrigger.dataset.value,
    notes: document.getElementById("input-notas").value,
    result: parseFloat(document.getElementById("input-resultado").value),
    type: parseFloat(document.getElementById("input-resultado").value) >= 0 ? "gain" : "loss"
  };

  const currentTrades = getTrades();
  currentTrades.push(newTrade);
  saveTrades(currentTrades);
  renderHistory();
  renderCharts(); // Atualiza os gráficos ao enviar novo trade!

  formRegister.reset();

  const activeTags = document.querySelectorAll(".tag-btn.selected");
  activeTags.forEach(tag => tag.classList.remove("selected"));

  const historyButton = document.querySelector('.tab-btn[data-tab="historico"]');
  if (historyButton) {
    historyButton.click();
  }
});

// ==========================================
// INICIALIZAÇÃO DO APP
// ==========================================
renderHistory();
renderCharts();

