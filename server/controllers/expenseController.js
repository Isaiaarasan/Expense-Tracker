import Expense from "../models/Expense.js";

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    console.error("Error fetching expenses:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getMonthlyReport = async (req, res) => {
  try {
    const report = await Expense.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      {
        $project: {
          month: "$_id",
          total: 1,
          _id: 0,
        },
      },
      { $sort: { month: 1 } },
    ]);
    res.json(report);
  } catch (err) {
    console.error("Error generating monthly report:", err);
    res.status(500).json({ error: err.message });
  }
};
