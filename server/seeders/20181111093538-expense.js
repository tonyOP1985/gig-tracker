'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Expenses', [
      {
        date: '10/21/2018',
        total: '20.00',
        updatedAt:  new Date(),
        createdAt:  new Date()
      },
      {
        date: '10/23/2018',
        total: '30.00',
        updatedAt:  new Date(),
        createdAt:  new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Expenses', null, {});
  }
};
