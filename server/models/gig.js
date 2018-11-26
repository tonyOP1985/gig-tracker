'use strict';
module.exports = (sequelize, DataTypes) => {
  const Gig = sequelize.define('Gig', {
    date: DataTypes.DATEONLY,
    pay: DataTypes.STRING,
    venue: DataTypes.STRING,
    band: DataTypes.STRING,
    mileage: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Gig.associate = function(models) {
    Gig.hasMany(models.User);
  };
  return Gig;
};