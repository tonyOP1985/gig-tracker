'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    date: DataTypes.DATEONLY,
    total: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Expense.associate = function(models) {
    Expense.hasMany(models.Item, {
      foreignKey: 'expense_id',
      as: 'items',
      onDelete: 'CASCADE'
    });
  };
  return Expense;
};