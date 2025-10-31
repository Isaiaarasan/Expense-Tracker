// models/Expense.js
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // ✅ Make it optional
  },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, default: "General" },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", expenseSchema);
