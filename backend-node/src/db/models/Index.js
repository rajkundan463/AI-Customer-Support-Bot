const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres"
  }
);

// Import models
const Session = require("./models/Session")(sequelize, DataTypes);
const Message = require("./models/Message")(sequelize, DataTypes);
const FAQ = require("./models/FAQ")(sequelize, DataTypes);
const Escalation = require("./models/Escalation")(sequelize, DataTypes);

// Setup associations
Session.associate({ Message, Escalation });
Message.associate = () => {};
FAQ.associate = () => {};
Escalation.associate = () => {};

module.exports = {
  sequelize,
  Session,
  Message,
  FAQ,
  Escalation
};
