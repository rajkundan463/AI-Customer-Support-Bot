module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define("Session", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    customerId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active" 
    }
  });

  Session.associate = (models) => {
    Session.hasMany(models.Message, { foreignKey: "session_id" });
    Session.hasOne(models.Escalation, { foreignKey: "session_id" });
  };

  return Session;
};
