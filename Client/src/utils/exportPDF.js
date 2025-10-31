import jsPDF from "jspdf";

export function exportPDF(expenses) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Expense Report", 10, 10);

  doc.setFontSize(10);
  let y = 20;

  doc.text("Title", 10, y);
  doc.text("Amount", 90, y);
  doc.text("Category", 120, y);
  doc.text("Date", 160, y);
  y += 6;

  expenses.forEach((exp) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.text(exp.title?.toString().slice(0, 30) || "", 10, y);
    doc.text(exp.amount?.toString() || "", 90, y);
    doc.text(exp.category?.toString() || "", 120, y);
    doc.text(new Date(exp.date).toLocaleDateString(), 160, y);
    y += 6;
  });

  doc.save("expenses.pdf");
}
