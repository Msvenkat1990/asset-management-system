const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Transaction = sequelize.define("Transaction", {
  id: {
    type: DataTypes.INTEGER,

    autoIncrement: true,

    primaryKey: true,
  },

  action: {
    type: DataTypes.STRING,
  },

  issueDate: {
    type: DataTypes.DATE,

    defaultValue: DataTypes.NOW,
  },

  returnDate: {
    type: DataTypes.DATE,
  },

  reason: {
    type: DataTypes.STRING,
  },
});

module.exports = Transaction;
