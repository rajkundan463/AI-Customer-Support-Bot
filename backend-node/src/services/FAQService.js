const FAQ = require("../db/models/FAQ");

// Basic fallback fuzzy similarity
function similarity(a, b) {
  if (!a || !b) return 0;
  a = a.toLowerCase();
  b = b.toLowerCase();

  let matches = 0;
  const A = a.split(" ");
  const B = b.split(" ");

  A.forEach(w1 => {
    if (B.includes(w1)) matches++;
  });

  return matches / Math.max(A.length, B.length);
}

module.exports = {

  // Fetch everything (admin)
  getAll: () => FAQ.find().sort({ createdAt: -1 }),

  // 🚀 Optimized search using MongoDB + fuzzy fallback
  search: async (query) => {
    if (!query || query.trim() === "") {
      return FAQ.find().sort({ createdAt: -1 });
    }

    // 1️⃣ MongoDB TEXT SEARCH (fast)
    let textResults = await FAQ.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    // If text index finds results → return top 5
    if (textResults.length > 0) {
      return textResults.slice(0, 5);
    }

    // 2️⃣ Fallback: fuzzy scoring
    const all = await FAQ.find();
    const scored = all
      .map(f => ({
        ...f._doc,
        score:
          similarity(query, f.question) +
          similarity(query, f.answer)
      }))
      .filter(f => f.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, 5);
  },

  // Best single match for LLM context building
  bestMatch: async (query) => {
    const results = await module.exports.search(query);
    return results.length > 0 ? results[0] : null;
  }
};
