const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense.js");
const auth = require("../middleware/auth.js");
const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");
const { Parser } = require("json2csv"); // ✅ Correct import for CommonJS
const { classifyCategory } = require("../services/categorize.js");

// configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// ➕ Add new expense for logged-in user
router.post("/", auth, async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    // If user provides category, use it; otherwise classify automatically
    const predictedCategory = category || (await classifyCategory(title));

    console.log(
      "[EXPENSE DEBUG] Category received:",
      category,
      "| Predicted:",
      predictedCategory
    );

    const expense = new Expense({
      userId: req.user.id,
      title,
      amount,
      category: predictedCategory,
      date: date ? new Date(date) : new Date(),
    });

    await expense.save();
    res.json(expense);
  } catch (err) {
    console.error("Add expense error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 📤 Upload CSV for logged-in user
router.post("/csv", auth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const results = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        if (row.title && row.amount && row.date) {
          results.push({
            userId: req.user.id,
            title: row.title,
            amount: parseFloat(row.amount),
            category: row.category || "General",
            date: new Date(row.date),
          });
        }
      })
      .on("end", async () => {
        if (results.length === 0) {
          fs.unlinkSync(filePath);
          return res.status(400).json({ error: "No valid data found in CSV" });
        }

        await Expense.insertMany(results);
        fs.unlinkSync(filePath);
        res.json({
          message: "CSV uploaded successfully",
          savedCount: results.length,
        });
      });
  } catch (err) {
    console.error("CSV upload error:", err);
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

// 🗑️ DELETE an expense by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!expense) {
      return res
        .status(404)
        .json({ error: "Expense not found or unauthorized" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete expense error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 📥 Download all expenses as CSV
router.get("/download", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).lean();

    if (!expenses.length)
      return res.status(400).json({ error: "No expenses found" });

    const fields = ["title", "amount", "category", "date"];
    const parser = new Parser({ fields });
    const csv = parser.parse(expenses);

    res.header("Content-Type", "text/csv");
    res.attachment("my-expenses.csv");
    return res.send(csv);
  } catch (err) {
    console.error("Download CSV error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
