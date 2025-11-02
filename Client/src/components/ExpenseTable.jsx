import React from "react";

export default function ExpenseTable({ expenses, onDelete }) {
  if (!expenses.length)
    return <p className="text-gray-500 text-center mt-4">No expenses yet.</p>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp._id} className="border-b">
              <td className="px-4 py-2">{exp.title}</td>
              <td className="px-4 py-2">₹{exp.amount}</td>
              <td className="px-4 py-2">{exp.category}</td>
              <td className="px-4 py-2">
                {new Date(exp.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onDelete(exp._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
