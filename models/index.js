const Employee = require("./employee");
const Asset = require("./asset");
const Category = require("./category");
const Transaction = require("./transaction");

// Category - Asset

Category.hasMany(Asset);

Asset.belongsTo(Category);

// Employee - Transaction

Employee.hasMany(Transaction);

Transaction.belongsTo(Employee);

// Asset - Transaction

Asset.hasMany(Transaction);

Transaction.belongsTo(Asset);

module.exports = {
  Employee,

  Asset,

  Category,

  Transaction,
};
