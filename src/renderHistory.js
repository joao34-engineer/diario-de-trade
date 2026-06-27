import { getTrades } from "./helpers.js";

// Pegamos o elemento do histórico diretamente no DOM deste arquivo. 
// Isso quebra a dependência circular com o index.js!
const logListContainer = document.getElementById("log-list");

export function renderHistory() {
  const trades = getTrades();

  // Segurança caso o elemento não exista na página por algum motivo
  if (!logListContainer) return;

  if (trades.length === 0) {
    logListContainer.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">📂</span>
        <p>Nenhuma operação registrada no replay ainda.</p>
      </div>
    `;
    return;
  }

  logListContainer.innerHTML = "";

  trades.slice().reverse().forEach(trade => {
    const card = document.createElement("div");
    card.className = "trade-card";

    const formattedResult = trade.result >= 0 ? `+${trade.result}` : trade.result;
    const dateParts = trade.date.split("-");
    const formattedDate = dateParts.length === 3 ?
      `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}` : trade.date;

    card.innerHTML = `
      <div class="trade-card-header">
        <span class="trade-card-date">🗓️${formattedDate} at ${trade.time}</span>
        <button type="button" class="delete-btn" data-id="${trade.id}" title="Deletar Registro">🗑️</button>
      </div>
      <div class="trade-card-summary">
        <span class="trade-card-region">Região: <strong style="color: var(--color-accent);">${trade.region}</strong></span>
        <span class="outcome-badge ${trade.type}">${formattedResult}PTS</span>
      </div>

      <div class="trade-card-tags">
        <span class="card-tag">⚔️ Agressor: ${trade.agressor}</span>
        <span class="card-tag">🛡️ Defesa: ${trade.defense}</span> 
        <span class="card-tag">🎯 Gatilho: ${trade.trigger}</span>
      </div>

      ${trade.notes ? `<div class="trade-card-notes">"${trade.notes}"</div>` : ""}
    `;

    logListContainer.appendChild(card);
  });
}
