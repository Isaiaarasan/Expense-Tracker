const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const { parse } = require("csv-parse");
const { categorizeExpense } = require("../services/categorize");

// Add single expense
router.post("/", async (req, res) => {
  try {
    const { title, amount, date } = req.body;
    if (!title || amount === undefined || amount === null)
      return res.status(400).json({ error: "title and amount required" });

    const category = await categorizeExpense(title, parseFloat(amount));
    const expense = new Expense({
      title,
      amount: parseFloat(amount),
      category,
      date: date ? new Date(date) : new Date(),
    });
    await expense.save();
    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// CSV upload
router.post("/csv", upload.single("file"), async (req, res) => {
  try {
    const path = req.file.path;
    const rows = [];
    fs.createReadStream(path)
      .pipe(parse({ columns: true, trim: true }))
      .on("data", (row) => rows.push(row))
      .on("end", async () => {
        const saved = [];
        for (const r of rows) {
          // attempt to find title and amount columns
          const title = (
            r.title ||
            r.description ||
            r.desc ||
            r.name ||
            ""
          ).toString();
          const amount = parseFloat(r.amount || r.value || r.price || 0);
          const date = r.date ? new Date(r.date) : new Date();
          const category = await categorizeExpense(title, amount);
          const e = new Expense({ title, amount, category, date });
          await e.save();
          saved.push(e);
        }
        fs.unlinkSync(path);
        res.json({ savedCount: saved.length, saved });
      })
      .on("error", (err) => {
        console.error(err);
        res.status(500).json({ error: "CSV parse error" });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all expenses
router.get("/all", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Monthly report
router.get("/report/monthly", async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ];
    const data = await Expense.aggregate(pipeline);
    res.json(data.map((d) => ({ month: d._id, total: d.total })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Category report
router.get("/report/category", async (req, res) => {
  try {
    const data = await Expense.aggregate([
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
      data.map((d) => ({ category: d._id, total: d.total, count: d.count }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
