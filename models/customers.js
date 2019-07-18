'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customers = sequelize.define('Customers', {
    customer_name: {
      type:  DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate : {
        notEmpty :true
      }
     },
    /* customer_id: DataTypes.INTEGER,*/
     customer_address: DataTypes.STRING,
     cust_email: {
       type:DataTypes.STRING,
       allowNull:false,
       unique:true,
       validate:{
         isEmail:true
       }
     },
     cust_phone: {
       type: DataTypes.STRING,
       allowNull:false,
       validate:{
         not :['[a-z]','i']
       }
     }
  }, {underscored: false,
    sequelize,
    modelName: 'Customers'});
  Customers.associate = function(models) {
    // associations can be defined here
    Customers.hasMany(models.orders,{ as : 'orders'})
  };
  return Customers;
};