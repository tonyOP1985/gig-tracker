'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    date: DataTypes.STRING,
    total: DataTypes.STRING
  }, {});
  Expense.associate = function(models) {
    Expense.hasMany(models.Item, { foreignKey: 'id' });
  };
  return Expense;
};