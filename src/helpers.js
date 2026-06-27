const LOCAL_STORAGE_KEY = "wdo_trades_log";


export function getTrades() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}


export function saveTrades(tradesList) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tradesList));
}