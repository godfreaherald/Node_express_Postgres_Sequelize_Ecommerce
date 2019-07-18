'use strict';
//add two new columns to orders model GWA
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .addColumn('orders', 'isDelivered', {
        type: Sequelize.BOOLEAN,
      default :false,
        validate: {
         // isEmail: true
        }
      })
      .then(() => {
        return queryInterface.addColumn('orders', 'isCancelled', {
          type: Sequelize.BOOLEAN,
          default :false,
          validate: {
            //min: 0,
           // max: 100
          }
        });
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('orders', 'isDelivered').then(() => {
      return queryInterface.removeColumn('orders', 'isCancelled');
    });
  }
};
