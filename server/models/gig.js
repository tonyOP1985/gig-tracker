'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gig = sequelize.define('Gig', {
    date: DataTypes.STRING,
    pay: DataTypes.STRING,
    venue: DataTypes.STRING,
    band: DataTypes.STRING,
    mileage: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  Gig.associate = function(models) {
    // associations can be defined here
  };
  return Gig;
};