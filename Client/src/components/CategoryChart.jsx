import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// 🧾 Local keyword-based expense categorizer
function localCategorize(text) {
  const s = (text || "").toLowerCase().trim();

  if (
    /biryani|dinner|lunch|breakfast|meal|restaurant|hotel|food|snack|pizza|swiggy|zomato|kfc|dominos/.test(
      s
    )
  )
    return "Food";

  if (
    /grocery|supermarket|purchase|vegetable|fruit|mart|bazaar|provision|store/.test(
      s
    )
  )
    return "Groceries";

  if (
    /uber|bus|ride|taxi|cab|auto|train|metro|spare|transport|fuel|petrol|diesel|bike|car/.test(
      s
    )
  )
    return "Transport";

  if (
    /netflix|amazon prime|spotify|hotstar|disney|zee5|subscription|youtube|entertainment|movie|series|show/.test(
      s
    )
  )
    return "Entertainment";

  if (
    /bill|electricity|water|internet|wifi|mobile recharge|gas|power|utility/.test(
      s
    )
  )
    return "Bills";

  if (/rent|apartment|flat|lease|pg|maintenance|tenant/.test(s)) return "Rent";

  if (/medicine|hospital|doctor|clinic|pharmacy|health|fitness|checkup/.test(s))
    return "Health";

  if (
    /school|college|tuition|exam|course|book|stationery|training|learning/.test(
      s
    )
  )
    return "Education";

  if (
    /shopping|amazon|flipkart|myntra|ajio|mall|store|cloth|dress|fashion/.test(
      s
    )
  )
    return "Shopping";

  if (/laptop|mobile|phone|tablet|charger|earphone|gadget|tv|camera/.test(s))
    return "Electronics";

  if (/flight|hotel|trip|travel|vacation|holiday|booking|tour/.test(s))
    return "Travel";

  if (/gift|birthday|family|friend|festival|celebration|wedding/.test(s))
    return "Gifts & Family";

  if (/salon|spa|beauty|makeup|cream|soap|toothpaste|haircut/.test(s))
    return "Personal Care";

  if (
    /loan|emi|bank|insurance|policy|investment|credit|debit|payment|transaction/.test(
      s
    )
  )
    return "Finance";

  if (/gym|workout|sports|yoga|exercise/.test(s)) return "Fitness";

  return "Others";
}

// 📊 Category Chart Component
export default function CategoryChart({ data }) {
  // categorize if needed
  const categorizedData = (data || []).map((d) => ({
    ...d,
    category: d.category || localCategorize(d.title),
  }));

  // group totals safely
  const grouped = {};
  categorizedData.forEach((d) => {
    if (!d) return;
    const category = d.category || "Others";
    const rawAmount = d.amount ?? "0";
    const amount = Number(rawAmount.toString().replace(/[^0-9.-]+/g, "")) || 0;
    grouped[category] = (grouped[category] || 0) + amount;
  });

  const labels = Object.keys(grouped);
  const values = Object.values(grouped);

  const chartData = { 
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#4e79a7",
          "#f28e2b",
          "#e15759",
          "#76b7b2",
          "#bac521ff",
          "#edc948",
          "#b07aa1",
          "#ff9da7",
          "#9c755f",
          "#bab0ab",
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
    pie: {
      radius: '100%'
    }
  };

  const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "left",
      labels: {
        boxWidth: 25,
        padding: 20,
        color: "white",
        font: {
          size: 16,
        },
      },
    },
  },
  layout: {
    
  },
};


  const totalAmount = values.reduce((sum, value) => sum + value, 0);

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        height: "100%",
        margin: "0 auto",
        width: "450px"
      }}
    >
      <div style={{ height: "100%" }}>
        {labels.length ? (
          <Pie data={chartData} options={chartOptions} />
        ) : (
          <div style={{ textAlign: "center", color: "#999" }}>
            <p>No category data available</p>
            <small>Add expenses to see category distribution</small>
          </div>
        )}
      </div>

      {/* {labels.length > 0 && (
        <div
          style={{
            textAlign: "center",
            marginTop: "15px",
            fontSize: "16px",
          }}
        >
        </div>
      )} */}
    </div>
  );
}
