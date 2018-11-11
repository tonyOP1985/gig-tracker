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

  return queryInterface.bulkInsert('Users', [
    {
      firstName: 'Juvia',
      lastName: 'Lockser',
      email: 'juvia@fairytail.com',
      updatedAt:  new Date(),
      createdAt:  new Date()
    },
    {
      firstName: 'Natsu',
      lastName: 'Dragneel',
      email: 'natsu@fairytail.com',
      updatedAt:  new Date(),
      createdAt:  new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
