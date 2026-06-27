import { getTrades, saveTrades } from "./helpers.js";
import { renderHistory } from "./renderHistory.js";
import { renderCharts } from "./charts.js";

const btnExport = document.getElementById("btn-export");
const btnImportTrigger = document.getElementById("btn-import-trigger");
const inputImport = document.getElementById("input-import");

// Lógica de Exportação
if (btnExport) {
  btnExport.addEventListener("click", () => {
    const trades = getTrades();
    if (trades.length === 0) {
      alert("Não há operações registradas para exportar!");
      return;
    }

    const dataStr = JSON.stringify(trades, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `wdo_trades_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}

// Lógica de Importação
if (btnImportTrigger && inputImport) {
  btnImportTrigger.addEventListener("click", () => {
    inputImport.click();
  });

  inputImport.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);

        // Correção aqui: adicionado o "!" para verificar se NÃO é uma lista
        if (!Array.isArray(importedData)) {
          throw new Error("O formato do arquivo de backup é inválido (deve ser uma lista de operações).");
        }

        const isValid = importedData.every(trade =>
          trade.id &&
          trade.date &&
          trade.time &&
          trade.region !== undefined &&
          trade.agressor &&
          trade.defense &&
          trade.trigger &&
          trade.result !== undefined
        );

        if (!isValid) {
          throw new Error("O backup contém dados inconsistentes ou campos obrigatórios ausentes.");
        }

        const confirmMessage = `Atenção: Você está prestes a importar ${importedData.length} operações.\n` +
          `Isso substituirá todo o seu histórico atual de forma irreversível. Deseja continuar?`;

        if (confirm(confirmMessage)) {
          saveTrades(importedData);
          renderHistory();
          renderCharts();
          alert("Backup importado com sucesso!");
        }
      } catch (err) {
        alert(`Erro ao importar o arquivo: ${err.message}`);
      } finally {
        inputImport.value = "";
      }
    };

    reader.readAsText(file);
  });
}
