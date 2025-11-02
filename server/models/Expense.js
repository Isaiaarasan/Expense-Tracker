const mongoose = require("mongoose");
const categories = [
  "Food",
  "Travel",
  "Rent",
  "Shopping",
  "Groceries",
  "Entertainment",
  "Bills",
  "Others",
  "General"
];

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category:{type:String, enum:categories, required:true},
  date: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Expense", expenseSchema);
