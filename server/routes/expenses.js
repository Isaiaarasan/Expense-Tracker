const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const auth = require("../middleware/auth"); // ✅ import auth middleware

// ➕ Add new expense for the logged-in user
router.post("/", auth, async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    const expense = new Expense({
      userId: req.user.id,
      title,
      amount,
      category: category || "General",
      date: date ? new Date(date) : new Date(),
    });

    await expense.save();
    res.json(expense);
  } catch (err) {
    console.error("Add expense error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 📦 Get all expenses for logged-in user
router.get("/all", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (err) {
    console.error("Fetch all error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 📊 Category-wise report for logged-in user
router.get("/report/category", auth, async (req, res) => {
  try {
    const data = await Expense.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(
      data.map((d) => ({
        category: d._id,
        total: d.total,
        count: d.count,
      }))
    );
  } catch (err) {
    console.error("Category report error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 📅 Monthly report for logged-in user
router.get("/report/monthly", auth, async (req, res) => {
  try {
    const data = await Expense.aggregate([
      { $match: { userId: req.user.id } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(data.map((d) => ({ month: d._id, total: d.total })));
  } catch (err) {
    console.error("Monthly report error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
