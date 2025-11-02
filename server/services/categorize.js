// utils/categoryClassifier.js
const Groq = require("groq-sdk");
require("dotenv").config();

// Initialize Groq client
const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

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

async function classifyCategory(title) {
  const lowerTitle = title.toLowerCase();

  // ✅ Manual rule override (Transport)
  const transportKeywords = ["uber", "ola", "taxi", "cab", "bus", "train", "flight", "fuel", "petrol", "diesel"];
  if (transportKeywords.some(w => lowerTitle.includes(w))) {
    console.log("[CATEGORY DEBUG] Transport match → Travel");
    return "Travel";
  }

  // ✅ Manual rule override (Food)
  const foodKeywords = ["zomato", "swiggy", "food", "lunch", "dinner", "breakfast", "restaurant", "eat", "hotel", "pizza", "burger", "meal"];
  if (foodKeywords.some(w => lowerTitle.includes(w))) {
    console.log("[CATEGORY DEBUG] Food match → Food");
    return "Food";
  }

  console.log("[CATEGORY DEBUG] Title →", title);

  const prompt = `
You are a financial expense classifier.
Return ONLY one word from this list:
${categories.join(", ")}

Expense title: "${title}"

Rules:
- Only return one valid category word.
- No punctuation or extra text.
- If unsure, return "Others".
`;

  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",   // ✅ more reliable
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
    max_completion_tokens: 20,
    top_p: 1,
    stream: false
  });

  console.log("[CATEGORY DEBUG] Raw:", completion);

  let raw = "";
  if (completion?.choices?.[0]?.message?.content) {
    raw = completion.choices[0].message.content.trim();
  }

  if (!raw) {
    console.warn("[CATEGORY DEBUG] LLM returned empty → Others");
    return "Others";
  }

  const category = raw.split(/\s+/)[0];

  console.log("[CATEGORY DEBUG] Predicted:", category);

  if (!categories.includes(category)) {
    console.warn("[CATEGORY DEBUG] Invalid LLM output:", category, "→ Others");
    return "Others";
  }

  return category;
}

module.exports = { classifyCategory };