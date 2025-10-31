import React from "react";

export default function ExpenseTable({ expenses }) {
  return (
    <div className="card">
      <h3>Expenses</h3>
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
              <td>Rs {e.amount}</td>
              <td>{e.category}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
