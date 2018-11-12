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
    return queryInterface.bulkInsert('Gigs', [
      {
        date: '10-20-2018',
        pay: '100',
        venue: 'Original Empire Pizza',
        band: 'Shannon Lee',
        mileage: '10',
        city: 'Rock Hill',
        state: 'SC',
        updatedAt:  new Date(),
        createdAt:  new Date()
      },
      {
        date: '10-20-2018',
        pay: '100',
        venue: 'Charlotte Marathon',
        band: 'Shannon Lee',
        mileage: '20',
        city: 'Charlotte',
        state: 'NC',
        updatedAt:  new Date(),
        createdAt:  new Date()
      }], {});
    },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Gigs', null, {});
  }
};
