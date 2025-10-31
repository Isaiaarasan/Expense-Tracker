// Categorization service: uses OpenAI if API key present, otherwise heuristic fallback.
const OpenAI = require("openai");

const categories = [
  "Food",
  "Travel",
  "Rent",
  "Shopping",
  "Groceries",
  "Entertainment",
  "Bills",
  "Others",
];

let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

async function categorizeExpense(title, amount) {
  // Use OpenAI when available
  if (openai) {
    try {
      const prompt = `Categorize the following expense into one of these categories: ${categories.join(
        ", "
      )}.

Description: ${title}
Amount: ${amount}

Only respond with exactly one category name from the list.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 10,
        temperature: 0,
      });

      const raw = response.choices[0].message.content.trim();

      // sanitize: attempt to match to one of the categories
      for (const c of categories) {
        if (raw.toLowerCase().includes(c.toLowerCase())) return c;
      }
      return "Others";
    } catch (err) {
      console.error("OpenAI error:", err.message || err);
      return heuristic(title, amount);
    }
  }

  return heuristic(title, amount);
}

function heuristic(title, amount) {
  if (!title) return "Others";
  const t = title.toLowerCase();
  if (t.match(/uber|ola|taxi|ride|bus|train|flight|ticket/)) return "Travel";
  if (t.match(/rent|emi|landlord/)) return "Rent";
  if (t.match(/netflix|prime|spotify|subscription|hulu/))
    return "Entertainment";
  if (t.match(/grocery|grocer|supermarket|bigbasket|flipkart|dmart/))
    return "Groceries";
  if (
    t.match(/restaurant|cafe|dine|biryani|meals|food|pizza|burger|dinner|lunch/)
  )
    return "Food";
  if (t.match(/bill|electric|electricity|water|internet|mobile|telephone/))
    return "Bills";
  if (t.match(/shopping|shirt|pant|shoe|amazon|myntra|flipkart|store|mall/))
    return "Shopping";
  if (amount && amount > 50000) return "Rent";
  return "Others";
}

module.exports = { categorizeExpense };
