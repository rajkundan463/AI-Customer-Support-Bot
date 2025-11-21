module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    session_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    sender: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true
    }
  });

  return Message;
};
