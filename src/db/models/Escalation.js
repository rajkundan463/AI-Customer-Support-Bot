module.exports = (sequelize, DataTypes) => {
  const Escalation = sequelize.define("Escalation", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    session_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    reason: DataTypes.TEXT,
    severity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending"
    }
  });

  return Escalation;
};
