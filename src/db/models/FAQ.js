module.exports = (sequelize, DataTypes) => {
  const FAQ = sequelize.define("FAQ", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    question: DataTypes.TEXT,
    answer: DataTypes.TEXT
  });

  return FAQ;
};
