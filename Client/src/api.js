const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";

// 🔒 Helper: get auth header
function getAuthHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ➕ Add expense
export const addExpense = async (data) => {
  const res = await fetch(`${SERVER}/api/expense`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to add expense");
  }

  return res.json();
};

// 📤 Upload CSV (optional auth if backend checks user)
export async function uploadCSV(formData) {
  const res = await fetch(`${SERVER}/api/expense/csv`, {
    method: "POST",
    headers: {
      ...getAuthHeader(),
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to upload CSV");
  }

  return res.json();
}

// 📦 Fetch all expenses for logged-in user
export async function fetchAll() {
  const res = await fetch(`${SERVER}/api/expense/all`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch expenses");
  }

  return res.json();
}

// 📊 Category-wise report
export async function fetchCategoryReport() {
  const res = await fetch(`${SERVER}/api/expense/report/category`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch category report");
  }

  return res.json();
}

// 📅 Monthly report
export async function fetchMonthlyReport() {
  const res = await fetch(`${SERVER}/api/expense/report/monthly`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to fetch monthly report");
  }

  return res.json();
}
