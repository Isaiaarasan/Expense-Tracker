require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const expensesRoute = require("./routes/expenses.js");
const authRoutes = require("./routes/authRoutes"); // ⬅️ ADD THIS LINE

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.ORIGIN || "*" }));

// Routes
app.use("/api/expense", expensesRoute);
app.use("/api/auth", authRoutes); // ⬅️ ADD THIS LINE

connectDB(process.env.MONGODB_URI);

app.get("/", (req, res) => res.send("Expense AI server is running"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
