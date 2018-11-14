'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    item: DataTypes.STRING,
    quantity: DataTypes.STRING,
    price: DataTypes.STRING,
    expense_id: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.Expense, {
      foreignKey: 'expense_id'
    });
  };
  return Item;
};