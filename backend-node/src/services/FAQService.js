const FAQ = require("../db/models/FAQ");

module.exports = {
  search: async (q) => {
    if (!q) {
      return await FAQ.find(); // return all records
    }

    // partial text search using regex (case-insensitive)
    return await FAQ.find({
      question: { $regex: q, $options: "i" }
    });
  }
};
