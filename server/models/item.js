'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    item: DataTypes.STRING,
    quantity: DataTypes.STRING,
    price: DataTypes.STRING
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.Expense, { foreignKey: 'id' });
  };
  return Item;
};