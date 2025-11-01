import React from "react";

export default function ExpenseTable({ expenses }) {
  return (
    <div>
      <h3>Expense History</h3>

      {!expenses || expenses.length === 0 ? (
        <div>
          No expenses recorded
          <br />
          <span>Add your first expense to see it here</span>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {(expenses || []).map((e) => (
              <tr key={e._id || `${e.title}-${e.amount}-${e.date}`}>
                <td>{e.title}</td>
                <td>Rs {parseFloat(e.amount).toLocaleString()}</td>
                <td>{e.category}</td>
                <td>
                  {new Date(e.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
