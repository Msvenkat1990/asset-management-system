const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Asset = sequelize.define("Asset", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  assetId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  serialNumber: {
    type: DataTypes.STRING,
    unique: true,
  },

  make: {
    type: DataTypes.STRING,
  },

  model: {
    type: DataTypes.STRING,
  },

  value: {
    type: DataTypes.INTEGER,
  },

  status: {
    type: DataTypes.ENUM("stock", "issued", "scrap"),
    defaultValue: "stock",
  },
});

module.exports = Asset;
