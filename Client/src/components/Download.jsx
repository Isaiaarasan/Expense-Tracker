const { Parser } = require("json2csv");

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
