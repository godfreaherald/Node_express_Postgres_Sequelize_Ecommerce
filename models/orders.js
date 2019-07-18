'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {

    CustomerId: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    product_qty: DataTypes.STRING,
    product_price: DataTypes.FLOAT,
    product_total: DataTypes.FLOAT,
    cart_total: DataTypes.FLOAT
  }, {underscored: false,
    sequelize,
    modelName: 'orders'});
  orders.associate = function(models) {
    // associations can be defined here
    orders.belongsTo(models.Customers,{
     foreignKey: 'CustomerId',as :'orders'
    })
  };
  return orders;
};