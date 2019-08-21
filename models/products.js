"use strict";
module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },

      product_qty: {
        type: DataTypes.STRING,
        validate: {
          not: ["[a-z]", "i"]
        }
      },
      product_price: {
        type: DataTypes.FLOAT,
        validate: {
          not: ["[a-z]", "i"]
        }
      }
    },
    {}
  );
  Products.associate = function(models) {
    // associations can be defined here
    Products.belongsTo(models.Categories, {
      foreignKey: "CategoryId"
      //as : 'products'
    });
  };
  return Products;
};
