const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

export async function addExpense(expense) {
  const res = await fetch(`${SERVER}/api/expense`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
  return res.json();
}

export async function uploadCSV(formData) {
  const res = await fetch(`${SERVER}/api/expense/csv`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

export async function fetchAll() {
  const res = await fetch(`${SERVER}/api/expense/all`);
  return res.json();
}

export async function fetchCategoryReport() {
  const res = await fetch(`${SERVER}/api/expense/report/category`);
  return res.json();
}

export async function fetchMonthlyReport() {
  const res = await fetch(`${SERVER}/api/expense/report/monthly`);
  return res.json();
}
