const { FAQ } = require("../db");

module.exports = {
  search: async (q) => {
    const all = await FAQ.findAll();
    if (!q) return all;

    return all.filter(f => f.question.toLowerCase().includes(q.toLowerCase()));
  }
};
